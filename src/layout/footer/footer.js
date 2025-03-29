import React from "react";
import { Link } from "react-router-dom";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer-container">
        <div className="footer-informations-container">
            <img src="/assets/selo_oficial_8.png" alt="logo" />
            <h2>TOPSIS</h2>
            <p>
            Nossa aplicação oferece suporte inteligente à tomada de decisão por meio do algoritmo TOPSIS, disponível de forma intuitiva e acessível. Simplifique suas escolhas com precisão e confiabilidade, independentemente do contexto ou complexidade da análise.
            </p>

            <p>©SAD TOPSIS LTD 2025. All rights reserved</p>
        </div>
        <div>

        </div>
    </footer>
  );
};

export default Footer;