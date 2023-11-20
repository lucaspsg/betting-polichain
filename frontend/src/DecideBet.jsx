// DecideBet.jsx
import React, { useState } from 'react';
//import contract from '../../backend/contracts'; // ajuste o caminho conforme necessário

const DecideBet = ({ contract: contract2, betId }) => {
  const [decision, setDecision] = useState('');

  const handleDecision = async () => {
    try {
      // Faça a chamada para o backend usando /api como prefixo
      const response = await fetch('/api/sua-rota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ decision, betId }),
      });

      // Adicione lógica para lidar com a resposta, se necessário
      console.log('Resposta do backend:', response);
    } catch (error) {
      console.error('Erro ao fazer a chamada para o backend:', error);
    }
  };

  return (
    <div>
      <h2>Decidir Aposta</h2>
      {/* Adicione elementos e lógica para decidir a aposta */}
      <input
        type="text"
        placeholder="Digite sua decisão"
        value={decision}
        onChange={(e) => setDecision(e.target.value)}
      />
      <button onClick={handleDecision}>Tomar Decisão</button>
    </div>
  );
};

export default DecideBet;
