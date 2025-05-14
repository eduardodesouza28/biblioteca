import React from 'react';
import './Navbar.css'; // Importar o CSS

const Navbar = ({ onShowForm }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">📚 ConectaLivro</h1>
        <button
          onClick={onShowForm}
          className="navbar-button"
        >
          Adicionar Livro
        </button>
      </div>
    </nav>
  );
};

export default Navbar;