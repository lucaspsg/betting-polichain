import React, { useState } from 'react';
import contract from './backend/contracts';

// Componente StartBet que utiliza as dependências necessárias e a lógica do contrato
const StartBet = ({ betId }) => {
  const [side1, setSide1] = useState('');
  const [side2, setSide2] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleStartBet = async () => {
    try {
      // Chame a função do contrato para iniciar a aposta
      const tx = await contract.methods.createBet('Nome da Aposta', side1, side2).send({ from: 'suaConta' });
      setFeedback(`Aposta iniciada com sucesso! ID da Aposta: ${tx.events.BetCreated.returnValues.betId}`);
    } catch (error) {
      setFeedback('Erro ao iniciar a aposta. Por favor, tente novamente.');
      console.error('Erro ao iniciar a aposta:', error);
    }
  };

  return (
    <div>
      <h2>Iniciar Aposta</h2>
      <input type="text" placeholder="Lado 1" onChange={(e) => setSide1(e.target.value)} />
      <input type="text" placeholder="Lado 2" onChange={(e) => setSide2(e.target.value)} />
      <button onClick={handleStartBet}>Iniciar Aposta</button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default StartBet;

