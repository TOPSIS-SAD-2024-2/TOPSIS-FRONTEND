import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import "./topsisFormPage.css";

function TopsisFormPage() {
  const navigate = useNavigate();

  const [alternatives, setAlternatives] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [performanceMatrix, setPerformanceMatrix] = useState({});
  const [distanceMetric, setDistanceMetric] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addAlternative = (event) => {
    event.preventDefault();
    const input = event.target.previousSibling;
    const value = input.value.trim();
    if (value) {
      setAlternatives([...alternatives, value]);
      input.value = '';
    }
  };

  const addCriterion = (event) => {
    event.preventDefault();
    const input = event.target.previousSibling;
    const value = input.value.trim();
    if (value) {
      setCriteria([...criteria, value]);
      input.value = '';
    }
  };

  const updateMatrix = (alt, crit, value) => {
    setPerformanceMatrix((prev) => ({
      ...prev,
      [alt]: {
        ...prev[alt],
        [crit]: Number(value)
      }
    }));
  };

  const [criteriaTypes, setCriteriaTypes] = useState({});

  const updateCriterionType = (crit, value) => {
    setCriteriaTypes((prev) => ({
      ...prev,
      [crit]: value
    }));
  };

  const [criteriaWeights, setCriteriaWeights] = useState({});

  const updateCriterionWeight = (crit, value) => {
    setCriteriaWeights((prev) => ({
      ...prev,
      [crit]: Number(value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validação básica de alternativas e critérios
    if (alternatives.length === 0) {
      newErrors.alternatives = "Adicione pelo menos uma alternativa";
    }
    
    if (criteria.length === 0) {
      newErrors.criteria = "Adicione pelo menos um critério";
    }
    
    // Validação de tipos de critérios
    criteria.forEach(crit => {
      if (!criteriaTypes[crit]) {
        newErrors.criteriaTypes = "Selecione o tipo (Max/Min) para todos os critérios";
      }
    });
    
    // Validação de pesos
    criteria.forEach(crit => {
      const weight = criteriaWeights[crit];
      if (!weight || isNaN(weight)) {  // Corrigido aqui
        newErrors.weights = "Insira um peso válido para todos os critérios";
      }
    });
    
    // Validação da matriz de performance
    alternatives.forEach(alt => {
      criteria.forEach(crit => {
        const value = performanceMatrix[alt]?.[crit];
        if (value === undefined || value === "" || isNaN(value)) {
          newErrors.performanceMatrix = "Preencha todos os valores da matriz de performance";
        }
      });
    });
    
    // Validação da métrica de distância
    if (!distanceMetric) {
      newErrors.distanceMetric = "Selecione uma métrica de distância";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    // Converting matrix into expected format
    const performanceMatrixFormatted = {};
    alternatives.forEach((alt) => {
      performanceMatrixFormatted[alt] = criteria.map((crit) => performanceMatrix[alt]?.[crit] || 0);
    });

    // Structuring data into the required format
    const inputData = {
      method: "TOPSIS",
      parameters: {
        alternatives,
        criteria,
        performance_matrix: performanceMatrixFormatted,
        criteria_types: criteriaTypes,
        weights: criteriaWeights,
        distance_metric: distanceMetric,
      },
    };

    console.log(inputData);

    // Redirecting to result page with the data
    navigate("/Result", { state: { inputData } });
    setIsSubmitting(false);
  };

  const renderError = (errorKey) => {
    return errors[errorKey] && (
      <div className="error-message">- {errors[errorKey]}</div>
    );
  };

  return (
    <div className="topsis-form-page-container">
      <div className="forms-container">
        <h1>Insira os Dados para o Método TOPSIS</h1>
        <p>
          Preencha as informações necessárias para calcular o método TOPSIS. 
          Insira alternativas, critérios, a matriz de performance, os tipos de critérios, os pesos e a métrica de distância desejada.
        </p>

        <fieldset>
          <label>Alternativas</label>
          {renderError("alternatives")}
          <div className="input-box">
            <input type="text" className="input-addition" placeholder="Preencha e adicione alternativas" />
            <button className="button-addition" onClick={addAlternative}>Adicionar +</button>
          </div>
          <ul className="filled-inputs-list">
            {alternatives.map((alt, idx) => (<li key={idx}>{alt}</li>))}
          </ul>
        </fieldset>

        <fieldset>
          
          <label>Critérios</label>
          {renderError("criteria")}
          <div className="input-box">
            <input type="text" className="input-addition" placeholder="Preencha e adicione critérios" />
            <button className="button-addition" onClick={addCriterion}>Adicionar +</button>
          </div>
          <ul className="filled-inputs-list">
            {criteria.map((alt, idx) => (<li key={idx}>{alt}</li>))}
          </ul>
        </fieldset>

        {criteria.length > 0 && (
          <fieldset>
            <div className="label-box">
              <label>Tipos de Critérios (Max/Min)</label>
              {renderError("criteriaTypes")}
            </div>
            
            <div className="list-types-criteria">
              {criteria.map((crit, idx) => (
                <div className="type-criteria" key={idx}>
                  <span>{crit}</span>
                  <div className="select-container" >
                    <select 
                    onChange={(e) => updateCriterionType(crit, e.target.value)}>
                      <option value="" selected hidden>Selecione...</option>
                      <option value="max">Max</option>
                      <option value="min">Min</option>
                    </select>
                    <FontAwesomeIcon className="angle-down-select" icon={faAngleDown} />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        )}

        {criteria.length > 0 && (
          <fieldset>
            <div className="label-box">
              <label>Peso dos Critérios</label>
              {renderError("weights")}
            </div>
            
            <div className="list-types-criteria">
              {criteria.map((crit, idx) => (
                <div className="type-criteria" key={idx}>
                  <span>{crit}</span>
                  <input
                    type="number"
                    placeholder="Ex: 7.5"
                    onChange={(e) => updateCriterionWeight(crit, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </fieldset>
        )}

        {alternatives.length > 0 && criteria.length > 0 && (
          <>
            <div className="label-box">
              <label>Matriz de Performance</label>
              {renderError("performanceMatrix")}
            </div>
           
            <div className="matrix-container">
                {alternatives.map((alt, idx) => (
                  <fieldset className="fieldset-matrix" key={idx}>
                    <span>Alternativa: {alt}</span>
                    <div className="list-matrix">
                      {criteria.map((crit, cidx) => (
                        <div key={cidx} className="item-matrix">
                          <label>{crit} </label>
                          <input
                            type="number"
                            step="0.01"
                            placeholder="Ex: 7.5"
                            onChange={(e) => updateMatrix(alt, crit, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </fieldset>
                ))}
            </div>
          </>
        )}

        {(alternatives.length > 0 && criteria.length > 0) && (
          <fieldset>
            <div className="label-box">
              <label>Métrica de distância</label>
              {renderError("distanceMetric")}
            </div>
           
            <div className="">
              <div className="select-container" >
                <select className="select-distance-metric" value={distanceMetric} onChange={(e) => setDistanceMetric(e.target.value)}>
                  <option value="" selected hidden>Selecione...</option>
                  <option value="2">2 - (Euclidiana)</option>
                  <option value="1">1 - (Manhattan)</option>
                  <option value="inf">infinito - (Chebyshev)</option>
                </select>
                <FontAwesomeIcon className="angle-down-select" icon={faAngleDown} />
              </div>
            </div>
          </fieldset>
        )}


      {(alternatives.length > 0 && criteria.length > 0) && (
        <div className="u-flex-right">
           <button 
              className={`button primary submit ${isSubmitting ? 'loading' : ''}`} 
              onClick={handleSubmit}
              disabled={isSubmitting}>
              {isSubmitting ? 'Processando...' : 'Enviar'}
            </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default TopsisFormPage;
