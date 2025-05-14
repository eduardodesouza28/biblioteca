import React, { useState, useEffect } from 'react';
import './BookForm.css'; // Importar o CSS

const BookForm = ({ onSubmit, onCancel, initialData, isLoading }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    genero: '',
    pontoComunitario: '',
    imagemCapa: '',
    status: 'disponivel',
    reservadoPor: null
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
         ...initialData,
         titulo: initialData.titulo || '',
         autor: initialData.autor || '',
         genero: initialData.genero || '',
         pontoComunitario: initialData.pontoComunitario || '',
         imagemCapa: initialData.imagemCapa || '',
         status: initialData.status || 'disponivel',
         reservadoPor: initialData.reservadoPor || null,
      });
    } else {
      setFormData({
        titulo: '',
        autor: '',
        genero: '',
        pontoComunitario: '',
        imagemCapa: '',
        status: 'disponivel',
        reservadoPor: null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="book-form">
        <h2>
          {initialData ? 'Editar Livro' : 'Adicionar Novo Livro'}
        </h2>
        
        {[
          { label: 'Título', name: 'titulo', type: 'text' },
          { label: 'Autor', name: 'autor', type: 'text' },
          { label: 'Gênero', name: 'genero', type: 'text' },
          { label: 'Ponto Comunitário', name: 'pontoComunitario', type: 'text' },
          { label: 'URL da Imagem da Capa (Opcional)', name: 'imagemCapa', type: 'url' },
        ].map(field => (
          <div className="form-field" key={field.name}>
            <label htmlFor={field.name}>
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.name === 'titulo' || field.name === 'autor' || field.name === 'pontoComunitario'}
            />
          </div>
        ))}

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="btn-cancel"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-submit"
          >
            {isLoading ? 'Salvando...' : (initialData ? 'Salvar Alterações' : 'Adicionar Livro')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;