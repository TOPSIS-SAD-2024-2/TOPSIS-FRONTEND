import { Link } from "react-router-dom";
import Navbar from "../../layout/navbar/navbar.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import "./home.css"; 

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="home-container">

        <header className="section-with-img-container">
            <div className="section-informations-container">
                <h1>Bem-vindo ao Método <span>TOPSIS</span></h1>
                <p>
                    O <strong>Técnica para Ordem de Preferência por Similaridade com a Solução Ideal</strong> 
                    (TOPSIS) é um método de tomada de decisão multicritério amplamente utilizado para 
                    escolher a melhor alternativa entre várias opções, considerando diferentes critérios de 
                    avaliação.
                </p>

                <Link to="/TopsisForm">
                  <button className="button primary">
                    Explorar Método
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </button>
                </Link>

            </div>

            <figure className="figure">
                <img className="flip" src="assets/Innovation.gif" alt="Logo" />
                
            </figure>
        </header>

        <section className="section-container">
            <h2>Para que serve o TOPSIS? 📌</h2>
            <ul>
                <li>
                  <span>Decisões Complexas, Feitas Simples</span>
                  <p>Ajuda a tomar decisões complexas considerando múltiplos critérios.</p>
                </li>
                <li>
                  <span>Aplicações em Diversos Setores</span>
                  <p>É amplamente usado em áreas como gestão, engenharia e economia.</p>
                </li>
                <li>
                  <span>Compare e Ranqueie com Precisão</span>
                  <p>Permite comparar alternativas e ranqueá-las de forma objetiva.</p>
                </li>
            </ul>
        </section>

        <section className="section-with-img-container">

            <figure className="figure">
              <img src="assets/Questions.svg" alt="Logo" />
            </figure>

            <div className="section-informations-container">
                <h2>Como funciona? ⚙️</h2>
                <p>
                O método <strong>TOPSIS</strong> é uma técnica de apoio à decisão que <strong>identifica a alternativa mais próxima da solução ideal</strong> (melhor opção) e se <strong>afasta da solução anti-ideal</strong> (pior opção). Para isso, utiliza uma <strong>matriz de desempenho ponderada</strong> e <strong>métricas de distância</strong>, considerando os pesos dos critérios de avaliação para oferecer uma análise clara e objetiva.
                </p>
            </div>
        </section>
      
        <section className="section-with-img-container">
          <div className="section-informations-container">
            <h2>Exemplo prático 📊</h2>
            <p>
              Imagine que você precisa escolher um novo fornecedor para sua empresa com base 
              em critérios como <strong>custo, qualidade e prazo de entrega</strong>. O TOPSIS ajudaria a 
              encontrar a melhor opção comparando todas as alternativas de forma estruturada.
            </p>
          </div>

          <figure className="figure">
              <img className="flip" src="assets/Solution.svg" alt="Logo" />
          </figure>
        </section>

  
        <section className="section-with-img-container">
          <figure className="figure">
              <img className="flip" src="assets/Startup.svg" alt="Logo" />
          </figure>
          <div className="section-informations-container">
            <h2>Vamos começar? 🚀</h2>
            <p>
              Quer tomar <strong>decisões mais inteligentes e assertivas</strong>? Use o método <strong>TOPSIS</strong> para comparar alternativas de forma <strong>objetiva</strong> e descubra qual é a <strong>melhor escolha</strong> para você. <strong>Preencha o formulário</strong> com seus dados e veja como essa ferramenta pode ajudar a <strong>otimizar suas decisões</strong>!
            </p>


            <Link to="/TopsisForm">
              <button className="button primary">
                Começar
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </button>
            </Link>
          </div>
        </section>
    </div>
    </>
  );
};

export default Home;
