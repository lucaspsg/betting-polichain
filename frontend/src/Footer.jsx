// AcceptBet.jsx
import React, { useState } from 'react';
import './AcceptBetFooter.css';
import AcceptBet from './AcceptBet'; // Importe o novo componente

const Footer = ({ contract: contract2, betId }) => {
  const [feedback, setFeedback] = useState('');

  const handleAcceptBet = async () => {
    try {
      // Faça a chamada para o backend usando /api como prefixo
      const response = await fetch('/api/sua-rota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ betId }),
      });

      // Adicione lógica para lidar com a resposta, se necessário
      console.log('Resposta do backend:', response);
      setFeedback('Aposta aceita com sucesso!');
    } catch (error) {
      console.error('Erro ao aceitar a aposta:', error);
      setFeedback('Erro ao aceitar a aposta. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Aceitar Aposta</h2>
      {/* Adicione elementos e lógica para aceitar a aposta */}
      <button onClick={handleAcceptBet}>Aceitar Aposta</button>
      {feedback && <p>{feedback}</p>}
      <AcceptBetFooter /> {/* Renderize o rodapé específico desta página */}
    </div>
  );
};

export default Footer;
