import React from 'react';
import './BookCard.css'; // Importar o CSS

const BookCard = ({ livro, onEdit, onDelete, onReserve, onCancelReservation }) => {
  return (
    <div className="book-card">
      <div>
        {livro.imagemCapa && (
          <img
            src={livro.imagemCapa}
            alt={`Capa de ${livro.titulo}`}
            className="book-card-image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
        <h3>{livro.titulo}</h3>
        <p>Autor: {livro.autor}</p>
        <p>Gênero: {livro.genero}</p>
        <p>Ponto: {livro.pontoComunitario}</p>
        <p className={`book-card-status ${livro.status === 'disponivel' ? 'status-disponivel' : 'status-reservado'}`}>
          Status: {livro.status === 'disponivel' ? 'Disponível' : `Reservado por ${livro.reservadoPor || 'desconhecido'}`}
        </p>
      </div>
      <div className="book-card-actions">
        {livro.status === 'disponivel' ? (
          <button
            onClick={() => onReserve(livro.id)}
            className="btn-reserve"
          >
            Reservar
          </button>
        ) : (
          <button
            onClick={() => onCancelReservation(livro.id)}
            className="btn-cancel-reserve"
          >
            Cancelar Reserva
          </button>
        )}
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