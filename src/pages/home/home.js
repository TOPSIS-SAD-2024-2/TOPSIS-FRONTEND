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

        <header className="section-with-img-container height-total">
            <div className="section-informations-container">
              
                <h1>Bem-vindo ao Método <span>TOPSIS</span></h1>
                <p className="paragraph-header">
                    O <strong>Técnica para Ordem de Preferência por Similaridade com a Solução Ideal</strong> 
                    (TOPSIS) é um método de tomada de decisão multicritério amplamente utilizado para 
                    escolher a melhor alternativa entre várias opções, considerando diferentes critérios de 
                    avaliação.
                </p>

                <Link to="/guide">
                  <button className="button terciary">
                    Explorar Método
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </button>
                </Link>

            </div>

            <figure className="figure">
              <img src="assets/header.svg" />
            </figure>
        </header>

        <section className="section-container" id="whatIsTopsis">
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

        <section className="section-with-img-container different-background" id="howItWorks">

            <figure className="figure">
              <img src="assets/question.svg" alt="Logo" />
            </figure>

            <div className="section-informations-container">
                <h2>Como funciona? 🔍</h2>
                <p>O método <strong>TOPSIS</strong> é uma ferramenta de apoio à decisão que ajuda a escolher a melhor opção entre várias alternativas. Ele faz isso comparando cada alternativa e identificando aquela que está mais próxima da <strong>solução ideal</strong> (a melhor escolha possível) e mais distante da <strong>solução anti-ideal</strong> (a pior escolha).</p>

                <p>Para isso, o TOPSIS utiliza uma <strong>tabela de avaliação</strong>, onde cada alternativa recebe notas em diferentes <strong>critérios</strong>, como <strong>preço, qualidade ou prazo de entrega</strong>. Além disso, cada critério tem um <strong>peso</strong>, que define sua importância na decisão. Com esses dados, o método calcula qual alternativa se destaca mais, oferecendo uma análise clara e objetiva para facilitar a escolha.</p>

            </div>
        </section>
      
        <section className="section-with-img-container " id="praticalExample">
          <div className="section-informations-container">
            <h2>Exemplo prático 📊</h2>
            <p>
              Imagine escolher um carro com base em <strong>consumo</strong>, <strong>conforto</strong>, <strong>preço</strong> 
              e <strong>reputação</strong>. O <strong>TOPSIS</strong> ajuda a decidir de forma objetiva, comparando alternativas 
              com pesos definidos por você. Por exemplo, avaliamos <strong>Pálio, HB20 e Corolla</strong> com pesos: <strong>consumo (30%)</strong>, <strong>conforto (5%)</strong>, <strong>preço (60%)</strong> e <strong>reputação (5%)</strong>. 
              A análise estrutura os dados e aponta a melhor escolha.
            </p>

            <img className="table-img" src="/assets/Table-example.png" alt=""/>
                    
          </div>

          <figure className="figure">
              <img  src="assets/example.svg" alt="Logo" />
          </figure>
        </section>

  
        <section className="section-with-img-container different-background" id="continueSection">
          <figure className="figure">
              <img className="flip" src="assets/continue.svg" alt="Logo" />
          </figure>
          <div className="section-informations-container">
            <h2>Vamos começar? 🚀</h2>
            <p>
              Quer tomar <strong>decisões mais inteligentes e assertivas</strong>? Use o método <strong>TOPSIS</strong> para comparar alternativas de forma <strong>objetiva</strong> e descubra qual é a <strong>melhor escolha</strong> para você. <strong>Preencha o formulário</strong> com seus dados e veja como essa ferramenta pode ajudar a <strong>otimizar suas decisões</strong>!
            </p>


            <Link  to="/guide">
              <button className="button primary">
                Explorar Método
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
