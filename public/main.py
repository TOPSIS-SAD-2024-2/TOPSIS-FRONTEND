import numpy as np
import json
from typing import Dict, List, Union, Optional

class TOPSIS:
    """
    A Python implementation of the TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)
    multi-criteria decision analysis method with configurable distance metrics.
    """
    
    def __init__(self, input_data: Union[str, Dict]):
        """
        Initialize the TOPSIS analyzer with input data.
        
        Args:
            input_data: Either a JSON string or a Python dictionary containing:
                - method: "TOPSIS"
                - parameters: Dictionary with alternatives, criteria, performance matrix, etc.
        """
        self.input_data = self._parse_input(input_data)
        self._validate_input()
        
        # Initialize result attributes
        self.ideal_pos = None
        self.ideal_neg = None
        self.dist_pos = None
        self.dist_neg = None
        self.clos_coefficient = None
        self.ranking = None
        
    def _parse_input(self, input_data: Union[str, Dict]) -> Dict:
        """Parse and validate input data."""
        if isinstance(input_data, str):
            try:
                return json.loads(input_data)
            except json.JSONDecodeError as e:
                raise ValueError("Invalid JSON input") from e
        elif isinstance(input_data, dict):
            return input_data
        else:
            raise TypeError("Input must be either JSON string or dictionary")
    
    def _validate_input(self):
        """Validate the input data structure and values."""
        if not isinstance(self.input_data, dict):
            raise ValueError("Input data must be a dictionary")
            
        if self.input_data.get('method') != 'TOPSIS':
            raise ValueError("Method must be 'TOPSIS'")
            
        params = self.input_data.get('parameters')
        if not params:
            raise ValueError("Missing 'parameters' in input data")
            
        required_keys = ['alternatives', 'criteria', 'performance_matrix', 
                        'criteria_types', 'weights']
        for key in required_keys:
            if key not in params:
                raise ValueError(f"Missing required parameter: {key}")
                
        # Validate performance matrix
        alts = params['alternatives']
        crits = params['criteria']
        matrix = params['performance_matrix']
        
        if len(alts) != len(matrix):
            raise ValueError("Number of alternatives doesn't match performance matrix")
            
        for alt in alts:
            if alt not in matrix:
                raise ValueError(f"Alternative {alt} missing from performance matrix")
            if len(matrix[alt]) != len(crits):
                raise ValueError(f"Performance values for {alt} don't match number of criteria")
    
    def calculate(self) -> Dict:
        """
        Perform the TOPSIS analysis and return results.
        
        Returns:
            Dictionary containing:
            - positive_ideal_solution
            - negative_ideal_solution
            - distance_to_pis
            - distance_to_nis
            - topsis_score
            - ranking
        """
        params = self.input_data['parameters']
        
        # Extract and prepare data
        self.alternatives = params['alternatives']
        self.criteria = params['criteria']
        self.criteria_types = params['criteria_types']
        self.weights = np.array([params['weights'][c] for c in self.criteria])
        
        # Get distance metric from parameters (default to euclidean if not specified)
        distance_metric = params.get('distance_metric', '2').lower()
        
        # Convert performance matrix to numpy array
        self.matrix_d = np.array([params['performance_matrix'][alt] for alt in self.alternatives])
        self.n_alt, self.n_crit = self.matrix_d.shape
        
        # Normalize and weight the matrix
        self._normalize_matrix()
        self._apply_weights()
        
        # Calculate solutions
        self._calculate_ideal_solutions()
        self._calculate_distances(distance_metric)
        self._calculate_closeness()
        self._calculate_ranking()
        
        return self._prepare_results()
    
    def _normalize_matrix(self):
        """Normalize the decision matrix."""
        with np.errstate(divide='ignore', invalid='ignore'):
            norms = np.sqrt(np.sum(self.matrix_d**2, axis=0))
            self.matrix_d = np.where(norms != 0, self.matrix_d / norms, 0)
    
    def _apply_weights(self):
        """Apply weights to the normalized matrix."""
        self.matrix_d = self.matrix_d * self.weights
    
    def _calculate_ideal_solutions(self):
        """Calculate positive and negative ideal solutions."""
        max_vals = self.matrix_d.max(axis=0)
        min_vals = self.matrix_d.min(axis=0)
        
        self.ideal_pos = np.zeros(self.n_crit)
        self.ideal_neg = np.zeros(self.n_crit)
        
        for j, crit in enumerate(self.criteria):
            if self.criteria_types[crit] in ["min", "cost"]:
                self.ideal_pos[j] = min_vals[j]
                self.ideal_neg[j] = max_vals[j]
            elif self.criteria_types[crit] in ["max", "benefit"]:
                self.ideal_pos[j] = max_vals[j]
                self.ideal_neg[j] = min_vals[j]
    
    def _calculate_distances(self, distance_metric: str):
        """Calculate distances to ideal solutions using specified metric."""
        self.dist_pos = np.zeros(self.n_alt)
        self.dist_neg = np.zeros(self.n_alt)
        
        for i in range(self.n_alt):
            diff_pos = self.matrix_d[i] - self.ideal_pos
            diff_neg = self.matrix_d[i] - self.ideal_neg
            
            if distance_metric == '1':
                # Manhattan distance (p=1)
                self.dist_pos[i] = np.sum(np.abs(diff_pos))
                self.dist_neg[i] = np.sum(np.abs(diff_neg))
            elif distance_metric == 'inf':
                # Chebyshev distance (p=infinity)
                self.dist_pos[i] = np.max(np.abs(diff_pos))
                self.dist_neg[i] = np.max(np.abs(diff_neg))
            else:
                # Default to Euclidean distance (p=2)
                self.dist_pos[i] = np.sqrt(np.sum(diff_pos**2))
                self.dist_neg[i] = np.sqrt(np.sum(diff_neg**2))
    
    def _calculate_closeness(self):
        """Calculate closeness coefficient."""
        with np.errstate(divide='ignore', invalid='ignore'):
            self.clos_coefficient = np.where(
                (self.dist_pos + self.dist_neg) != 0,
                self.dist_neg / (self.dist_pos + self.dist_neg),
                0
            )
    
    def _calculate_ranking(self):
        """Determine the ranking of alternatives."""
        self.ranking = [self.alternatives[i] for i in np.argsort(-self.clos_coefficient)]
    
    def _prepare_results(self) -> Dict:
        """Prepare the results in the standardized output format."""
        def round_values(d):
            return {k: round(float(v), 4) for k, v in d.items()}
        
        return {
            "method": "TOPSIS",
            "results": {
                "positive_ideal_solution": round_values(dict(zip(self.criteria, self.ideal_pos))),
                "negative_ideal_solution": round_values(dict(zip(self.criteria, self.ideal_neg))),
                "distance_to_pis": round_values(dict(zip(self.alternatives, self.dist_pos))),
                "distance_to_nis": round_values(dict(zip(self.alternatives, self.dist_neg))),
                "topsis_score": round_values(dict(zip(self.alternatives, self.clos_coefficient))),
                "ranking": self.ranking
            }
        }
    
    def to_json(self) -> str:
        """Return results as JSON string."""
        return json.dumps(self.calculate(), indent=2)
