// StartBet.jsx
import React, { useState } from 'react';
import './StartBet.css'; // Importe o arquivo de estilo para StartBet
 // Importe o arquivo de estilo para AcceptBetFooter
//import contract from '../../backend/contracts'; // ajuste o caminho conforme necessário

const StartBet = () => {
  const [betDetails, setBetDetails] = useState({
    name: '',
    side1: '',
    side2: '',
  });

  const handleStartBet = async () => {
    try {
      // Faça a chamada para o backend usando /api como prefixo
      const response = await fetch('/api/sua-rota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(betDetails),
      });

      // Adicione lógica para lidar com a resposta, se necessário
      console.log('Resposta do backend:', response);
    } catch (error) {
      console.error('Erro ao iniciar a aposta:', error);
    }
  };

  return (
    <div>
      <h2>Betting Polichain</h2>
      {/* Adicione elementos e lógica para iniciar a aposta */}
      <input
        type="text"
        placeholder="Nome da aposta"
        value={betDetails.name}
        onChange={(e) => setBetDetails({ ...betDetails, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Apostador A"
        value={betDetails.side1}
        onChange={(e) => setBetDetails({ ...betDetails, side1: e.target.value })}
      />
      <input
        type="text"
        placeholder="Apostador B"
        value={betDetails.side2}
        onChange={(e) => setBetDetails({ ...betDetails, side2: e.target.value })}
      />
      <button onClick={handleStartBet}>Iniciar Aposta</button>
    </div>
  );
};

export default StartBet;

       

