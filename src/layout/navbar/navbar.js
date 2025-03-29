import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import "./navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="logo-container">
        <img src="/assets/HC.png" alt="logo-img"/>
        <h1 className="name-logo">TOPSIS</h1>
      </div>
   
      <ul className="">
        <li className="item">
          <a href="#whatIsTopsis" className="">
            Para que serve?
          </a>
        </li>
        <li  className="item">
          <a href="#howItWorks" className="">
            Como funciona?
          </a>
        </li>
        <li  className="item">
          <a href="#praticalExample" to="/" className="">
            Exemplo prático
          </a>
        </li>
        <li  className="item-highlight">
          <Link to="TopsisForm">
            Começar
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;