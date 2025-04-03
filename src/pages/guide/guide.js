import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./guide.css"; 

const Overview = () => {
  const navigate = useNavigate();

  return (
    <div className="overview">
         <h2>Guia Rápido do TOPSIS</h2>
        <div className='wrapper'>
               
            <div className="info-box">
                <h3>Alternativas</h3>

                <p>São as opções que você está avaliando.</p>
                <p>Exemplo:  notebook A , notebook B, notebook C</p>
            </div>
            
            <div className="info-box">
                <h3>Critérios</h3>
                <p>Características para comparar.</p>
                <p>Exemplo:  Preço, Memória RAM, "Autonomia de Bateria"</p>
            </div>

            <div className="info-box">
                <h3>Matriz de Performance</h3>
                <p>Valores de cada critério para cada alternativa.</p>
                <p>
                    Notebook A - Preço: 3500 - RAM: 8 - Bateria: 6
                    <br></br>
                    Notebook B - Preço: 4200 - RAM: 16 - Bateria: 9
                    <br></br>
                    Notebook C - Preço: 3800 - RAM: 12 - Bateria: 7
                </p>
            </div>

            <div className="info-box">
                <h3>Tipo do Critério</h3>
                <p>"max" quanto maior, melhor e "min" quanto menor, melhor </p>
                <p>Exemplo de "max": Memória RAM, Bateria <br></br>Exemplo de "min": Preço</p>       
            </div>

            <div className="info-box">
                <h3>Pesos</h3>
                <p>Valores de 0 a 1 (a soma deve dar 1)</p>
                <p>
                    Preço: 0.5 ou seja 50% de importância
                    <br></br>
                    RAM: 0.3 ou seja 30%
                    <br></br>
                    Bateria: 0.2 ou seja 20%
                </p>
            </div>

            <div className="info-box">
                <h3>Tipo de Distância</h3>
                <p>Define como calcular a "distância" entre cada alternativa e a solução ideal.</p>

                <p>
                    Euclidiana (p=2)	Padrão - considera todos os critérios igualmente
                    <br></br>
                    Manhattan (p=1)	Quando critérios têm pesos similares
                    <br></br>
                    Chebyshev (p=∞)	Quando só o pior critério importa
                </p>
            </div>

            <button 
                className='button primary'  
                onClick={() => navigate('/TopsisForm')}
            >
                Ir para o Formulário
            </button>
        </div>
     
    </div>
  );
};

const Guide = () => {
  const navigate = useNavigate();
  const [showOverview, setShowOverview] = useState(true);
  const [userChoice, setUserChoice] = useState(null);

  const handleChoice = (choice) => {
    setUserChoice(choice);
    setShowOverview(choice);
    if (!choice) {
      navigate('/TopsisForm');
    }
  };

  if (userChoice === null) {
    return (
      <div className="initial-prompt">
        <h1>Bem-vindo(a) ao Método TOPSIS</h1>
        <p>Deseja ver um resumo sobre como preencher os dados?</p>
        <div className="choice-buttons">
          <button className='button' onClick={() => handleChoice(true)}>Sim, me mostre</button>
          <button className='button primary' onClick={() => handleChoice(false)}>Não, ir direto ao formulário</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {showOverview && <Overview />}
    </div>
  );
};

export default Guide;