import React, { useState } from 'react';
import './StartBet.css';

const Header = () => {
  const [betDetails, setBetDetails] = useState({
    name: '',
    side1: '',
    side2: '',
  });

  const handleStartBet = async () => {
    try {
      const response = await fetch('/api/sua-rota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(betDetails),
      });

      console.log('Resposta do backend:', response);
    } catch (error) {
      console.error('Erro ao iniciar a aposta:', error);
    }
  };

  return (
    <div className="start-bet-container">
      <h2 className="betting-title">Betting Polichain</h2>
      <div className="input-container">
        <input
          className="bet-input"
          type="text"
          placeholder="Nome da aposta"
          value={betDetails.name}
          onChange={(e) => setBetDetails({ ...betDetails, name: e.target.value })}
        />
      </div>
      <div className="input-container">
        <input
          className="bet-input"
          type="text"
          placeholder="Apostador A"
          value={betDetails.side1}
          onChange={(e) => setBetDetails({ ...betDetails, side1: e.target.value })}
        />
      </div>
      <div className="input-container">
        <input
          className="bet-input"
          type="text"
          placeholder="Apostador B"
          value={betDetails.side2}
          onChange={(e) => setBetDetails({ ...betDetails, side2: e.target.value })}
        />
      </div>
      <button onClick={handleStartBet} className="start-bet-button">
        Iniciar Aposta
      </button>
    </div>
  );
};

export default Header;

