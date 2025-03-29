import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./resultPage.css";

// Configurações do Pyodide
const PYODIDE_CONFIG = {
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.0/full/",
  packages: ["numpy", "micropip"],
  pythonFile: "/main.py"
};

function ResultPage() {
  const location = useLocation();
  const { inputData } = location.state || {};
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pyodide, setPyodide] = useState(null);

  // Dados de exemplo (substitua por inputData quando disponível)
  const defaultInput = {
    method: "TOPSIS",
    parameters: {
      alternatives: ["A1", "A2", "A3"],
      criteria: ["C1", "C2", "C3"],
      performance_matrix: {
        A1: [0.7, 0.5, 0.8],
        A2: [0.6, 0.7, 0.6],
        A3: [0.8, 0.6, 0.7]
      },
      criteria_types: {
        C1: "max",
        C2: "min",
        C3: "max"
      },
      weights: {
        C1: 0.4,
        C2: 0.3,
        C3: 0.3
      },
      distance_metric: 2
    }
  };

  // Carrega o Pyodide uma vez quando o componente monta
  const initializePyodide = useCallback(async () => {
    try {
      if (!window.loadPyodide) {
        throw new Error("Pyodide não está disponível no window");
      }

      setLoading(true);
      const pyodideInstance = await window.loadPyodide({
        indexURL: PYODIDE_CONFIG.indexURL
      });

      // Carrega pacotes necessários
      for (const pkg of PYODIDE_CONFIG.packages) {
        await pyodideInstance.loadPackage(pkg);
      }

      setPyodide(pyodideInstance);
      return pyodideInstance;
    } catch (err) {
      console.error("Falha ao inicializar Pyodide:", err);
      setError("Falha ao carregar o ambiente Python");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Executa o código Python com os dados de entrada
  const runPythonCode = useCallback(async (pyodideInstance, input) => {
    try {
      setLoading(true);
      
      // 1. Carrega o código Python
      const response = await fetch(PYODIDE_CONFIG.pythonFile);
      if (!response.ok) throw new Error("Arquivo Python não encontrado");
      const pythonCode = await response.text();

      // 2. Injeta os dados no contexto Python
      pyodideInstance.globals.set("input_data", JSON.stringify(input));

      // 3. Executa o código
      await pyodideInstance.runPythonAsync(pythonCode);

      // 4. Obtém o resultado (assumindo que seu Python expõe get_input_data)
      const resultProxy = pyodideInstance.globals.get("get_input_data")(JSON.stringify(input));
      const result = resultProxy.toJs({ dict_converter: Object.fromEntries });

      return result;
    } catch (err) {
      console.error("Erro na execução Python:", err);
      setError("Erro ao processar os dados");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Efeito principal que orquestra o processo
  useEffect(() => {
    let mounted = true;

    async function processData() {
      try {
        const pyodideInstance = pyodide || (await initializePyodide());
        if (!mounted) return;

        const input = inputData || defaultInput;
        const result = await runPythonCode(pyodideInstance, input);
        if (mounted) setResult(result);
      } catch (err) {
        if (mounted) setError(err.message);
      }
    }

    processData();

    return () => {
      mounted = false;
    };
  }, [pyodide, initializePyodide, runPythonCode, inputData]);

  // Renderização condicional
  const renderContent = () => {
    if (loading) {
      return (
        <div className="loader-container">
          <span className="loader"></span> 
          <p>Processando dados...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <h3>Ocorreu um erro</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Tentar novamente</button>
        </div>
      );
    }

    if (!result) return null;

    return (
      <div className="result-list-container">
        <div className="box-1">
          <div className="result-box ranking">
            <h4>Ranking das Alternativas</h4>
            <ol>
              {result.results.ranking.map((alternative, index) => (
                <li key={alternative}>
                  <strong>{index + 1}º</strong> {alternative}
                </li>
              ))}
            </ol>
          </div>
          
          <div className="result-box score">
            <h4>Scores TOPSIS</h4>
            <ul>
              {Object.entries(result.results.topsis_score).map(([alternative, value]) => (
                <li key={alternative}>
                  <strong>{alternative}</strong> {value.toFixed(4)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="box-1">
          <div className="result-box small-list">
            <h4>Solução Ideal Positiva</h4>
            <ul>
              {Object.entries(result.results.positive_ideal_solution).map(([criterion, value]) => (
                <li key={criterion}>
                  <strong>{criterion}:</strong> {value.toFixed(4)}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="result-box small-list">
            <h4>Solução Ideal Negativa</h4>
            <ul>
              {Object.entries(result.results.negative_ideal_solution).map(([criterion, value]) => (
                <li key={criterion}>
                  <strong>{criterion}:</strong> {value.toFixed(4)}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="result-box small-list">
            <h4>Distância para a Solução Ideal Positiva</h4>
            <ul>
              {Object.entries(result.results.distance_to_pis).map(([alternative, value]) => (
                <li key={alternative}>
                  <strong>{alternative}:</strong> {value.toFixed(4)}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="result-box small-list">
            <h4>Distância para a Solução Ideal Negativa</h4>
            <ul>
              {Object.entries(result.results.distance_to_nis).map(([alternative, value]) => (
                <li key={alternative}>
                  <strong>{alternative}:</strong> {value.toFixed(4)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="result-page-container">
      <h1>Resultado TOPSIS</h1>
      {renderContent()}
    </div>
  );
}

export default ResultPage;