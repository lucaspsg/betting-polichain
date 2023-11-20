import React, { useState } from 'react';
import contract from './backend/contracts'; // substitua pelo caminho real

const AcceptBet = ({ contract, betId }) => {
  const [feedback, setFeedback] = useState('');

  const handleAcceptBet = async () => {
    try {
      // Chame a função do contrato para aceitar a aposta
      const tx = await contract.methods.acceptBet(betId).send({ from: 'suaConta' });

      // Adicione lógica para aceitar a aposta, se necessário

      // Adicione feedback para o usuário, se necessário
      console.log('A aposta foi aceita com sucesso!', tx);
      setFeedback('Aposta aceita com sucesso!');
    } catch (error) {
      console.error('Erro ao aceitar a aposta', error);
      setFeedback('Erro ao aceitar a aposta. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Aceitar Aposta</h2>
      {/* Adicione elementos e lógica para aceitar a aposta */}
      <button onClick={handleAcceptBet}>Aceitar Aposta</button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default AcceptBet;
