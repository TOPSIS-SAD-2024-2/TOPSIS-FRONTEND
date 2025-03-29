import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <h1 className="name-logo">TOPSIS</h1>
      <ul className="">
        <li>
          <Link to="/" className="">
            Para que serve?
          </Link>
        </li>
        <li>
          <Link to="/" className="">
            Como funciona?
          </Link>
        </li>
        <li>
          <Link to="/" className="">
            Exemplo prático
          </Link>
        </li>
        <li  className="item-highlight">
          <Link to="TopsisForm">
            Vamos Começar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;