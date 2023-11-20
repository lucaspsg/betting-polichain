import React, { useState } from 'react';
import contract from './backend/contracts'; // substitua pelo caminho real

const DecideBet = ({ contract, betId }) => {
  const [feedback, setFeedback] = useState('');

  const handleDecideBet = async () => {
    try {
      // Chame a função do contrato para decidir a aposta
      const tx = await contract.methods.decideBet(betId).send({ from: 'suaConta' });

      // Adicione lógica para decidir a aposta, se necessário

      // Adicione feedback para o usuário, se necessário
      console.log('A aposta foi decidida com sucesso!', tx);
      setFeedback('Aposta decidida com sucesso!');
    } catch (error) {
      console.error('Erro ao decidir a aposta', error);
      setFeedback('Erro ao decidir a aposta. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Decidir Aposta</h2>
      {/* Adicione elementos e lógica para decidir a aposta */}
      <button onClick={handleDecideBet}>Decidir Aposta</button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default DecideBet;
