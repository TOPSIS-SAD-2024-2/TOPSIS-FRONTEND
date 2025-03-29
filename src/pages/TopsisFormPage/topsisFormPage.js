import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./topsisFormPage.css";

function TopsisFormPage() {
  const navigate = useNavigate();

  const [alternatives, setAlternatives] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [performanceMatrix, setPerformanceMatrix] = useState({});
  const [distanceMetric, setDistanceMetric] = useState("");

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
        [crit]: value
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
      [crit]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
  };

  return (
    <div className="topsis-form-page-container">
      <figure>
        <img src="assets/Forms.svg" alt="TOPSIS Method" />
      </figure>

      <div className="forms-container">
        <h1>Insira os Dados para o Método TOPSIS</h1>
        <p>
          Preencha as informações necessárias para calcular o método TOPSIS. 
          Insira alternativas, critérios, a matriz de performance, os tipos de critérios, os pesos e a métrica de distância desejada.
        </p>

        <fieldset>
          <label>Alternativas</label>
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
            <label>Tipos de Critérios (Max/Min)</label>
            <div className="list-types-criteria">
              {criteria.map((crit, idx) => (
                <div className="type-criteria" key={idx}>
                  <span>{crit}</span>
                  <select onChange={(e) => updateCriterionType(crit, e.target.value)}>
                    <option value="max">Max</option>
                    <option value="min">Min</option>
                  </select>
                </div>
              ))}
            </div>
          </fieldset>
        )}

        {criteria.length > 0 && (
          <fieldset>
            <label>Peso dos Critérios</label>
            <div className="list-types-criteria">
              {criteria.map((crit, idx) => (
                <div className="type-criteria" key={idx}>
                  <span>{crit}</span>
                  <input
                    type="number"
                    placeholder="0"
                    onChange={(e) => updateCriterionWeight(crit, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </fieldset>
        )}

        {alternatives.length > 0 && criteria.length > 0 && (
          <>
            <label>Matriz de Performance</label>
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
                            placeholder="0"
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
            <label>Métrica de distância</label>
            <div className="">
              <select className="select-distance-metric" value={distanceMetric} onChange={(e) => setDistanceMetric(e.target.value)}>
                <option value="2">2 - (Euclidiana)</option>
                <option value="1">1 - (Manhattan)</option>
                <option value="inf">infinito - (Chebyshev)</option>
              </select>
            </div>
          </fieldset>
        )}


      {(alternatives.length > 0 && criteria.length > 0) && (
        <div className="u-flex-right">
           <button className="button primary submit" onClick={handleSubmit}>
          Enviar Dados
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default TopsisFormPage;
