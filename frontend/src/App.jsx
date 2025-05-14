import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import FeedbackMessage from './components/FeedbackMessage';
import * as api from './services/api';
import './App.css'; // Importar o CSS para App

function App() {
  const [livros, setLivros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const displaySuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(clearMessages, 3000);
  };

  const displayError = (message) => {
    setError(message);
    setTimeout(clearMessages, 5000);
  };

  const fetchLivros = useCallback(async () => {
    clearMessages();
    setIsLoading(true);
    try {
      const response = await api.getLivros();
      setLivros(response.data);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
      displayError("Falha ao buscar livros. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLivros();
  }, [fetchLivros]);

  const handleFormSubmit = async (formData) => {
    clearMessages();
    setIsLoading(true);
    try {
      if (editingBook) {
        await api.updateLivro(editingBook.id, formData);
        displaySuccess("Livro atualizado com sucesso!");
      } else {
        const newBookData = {
          ...formData,
          status: formData.status || 'disponivel',
          reservadoPor: formData.reservadoPor || null,
        };
        await api.addLivro(newBookData);
        displaySuccess("Livro adicionado com sucesso!");
      }
      setShowForm(false);
      setEditingBook(null);
      fetchLivros();
    } catch (err) {
      console.error("Erro ao salvar livro:", err);
      displayError(`Falha ao ${editingBook ? 'atualizar' : 'adicionar'} livro.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (livro) => {
    clearMessages();
    setEditingBook(livro);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    clearMessages();
    if (window.confirm("Tem certeza que deseja excluir este livro?")) {
      setIsLoading(true);
      try {
        await api.deleteLivro(id);
        displaySuccess("Livro excluído com sucesso!");
        fetchLivros();
      } catch (err) {
        console.error("Erro ao excluir livro:", err);
        displayError("Falha ao excluir livro.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReserve = async (id) => {
    clearMessages();
    const reservadoPorEmail = prompt("Por favor, informe seu e-mail para reserva:");
    if (reservadoPorEmail) {
      setIsLoading(true);
      try {
        await api.updateLivro(id, { status: 'reservado', reservadoPor: reservadoPorEmail });
        displaySuccess("Livro reservado com sucesso!");
        fetchLivros();
      } catch (err) {
        console.error("Erro ao reservar livro:", err);
        displayError("Falha ao reservar livro.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancelReservation = async (id) => {
    clearMessages();
    setIsLoading(true);
    try {
      await api.updateLivro(id, { status: 'disponivel', reservadoPor: null });
      displaySuccess("Reserva cancelada com sucesso!");
      fetchLivros();
    } catch (err) {
      console.error("Erro ao cancelar reserva:", err);
      displayError("Falha ao cancelar reserva.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowForm = () => {
    clearMessages();
    setEditingBook(null);
    setShowForm(true);
  }

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBook(null);
    clearMessages();
  }

  return (
    <div className="app-container">
      <Navbar onShowForm={handleShowForm} />
      <div className="container"> {/* Usando a classe container global */}
        {successMessage && <FeedbackMessage message={successMessage} type="success" />}
        {error && <FeedbackMessage message={error} type="error" />}
        {isLoading && !showForm && <FeedbackMessage message="Carregando livros..." type="loading" />}

        {showForm && (
          <BookForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            initialData={editingBook}
            isLoading={isLoading}
          />
        )}

        {!showForm && (
          <>
            {livros.length === 0 && !isLoading && (
              <p className="no-books-message">Nenhum livro encontrado.</p>
            )}
            <div className="book-list-container">
              {livros.map((livro) => (
                <BookCard
                  key={livro.id}
                  livro={livro}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onReserve={handleReserve}
                  onCancelReservation={handleCancelReservation}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;