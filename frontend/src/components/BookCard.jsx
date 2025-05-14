import React from 'react';
import './BookCard.css';

const BookCard = ({ livro, onEdit, onDelete, onReserve, onCancelReservation }) => {
  return (
    <div className="book-card">
      <div> {/* Conteúdo principal do card */}
        <div className="book-card-image-container"> {/* Novo container */}
          {livro.imagemCapa ? (
            <img
              src={livro.imagemCapa}
              alt={`Capa de ${livro.titulo}`}
              className="book-card-image"
              onError={(e) => { e.target.style.display = 'none'; /* Oculta se a imagem falhar */ }}
            />
          ) : (
            <div className="book-card-image-placeholder"></div> // Opcional: Estilizar placeholder
          )}
        </div>
        <h3>{livro.titulo}</h3>
        <p><strong>Autor:</strong> {livro.autor}</p>
        <p><strong>Gênero:</strong> {livro.genero}</p>
        <p><strong>Ponto:</strong> {livro.pontoComunitario}</p>
        <p className={`book-card-status ${livro.status === 'disponivel' ? 'status-disponivel' : 'status-reservado'}`}>
          {livro.status === 'disponivel' ? 'Disponível' :
            (<>Reservado <small>({livro.reservadoPor || 'desconhecido'})</small></>)
          }
        </p>
      </div>
      <div className="book-card-actions">
        {livro.status === 'disponivel' ? (
          <button
            onClick={() => onReserve(livro.id)}
            className="btn-reserve btn-main-action" // Classe para ação principal
          >
            Reservar
          </button>
        ) : (
          <button
            onClick={() => onCancelReservation(livro.id)}
            className="btn-cancel-reserve btn-main-action" // Classe para ação principal
          >
            Cancelar Reserva
          </button>
        )}
        {/* Botões de editar e excluir abaixo, se a ação principal não ocupar tudo */}
        <button
          onClick={() => onEdit(livro)}
          className="btn-edit"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(livro.id)}
          className="btn-delete"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default BookCard;