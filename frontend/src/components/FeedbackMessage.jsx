import React from 'react';
// Não precisa de CSS específico se usar as classes globais

const FeedbackMessage = ({ message, type }) => {
  if (!message) return null;

  const typeClasses = {
    success: "feedback-success",
    error: "feedback-error",
    loading: "feedback-loading",
  };

  return (
    <div className={`feedback-message ${typeClasses[type] || typeClasses.loading}`}>
      {message}
    </div>
  );
};

export default FeedbackMessage;