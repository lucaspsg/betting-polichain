// AcceptBet.jsx
import React, { useState, useEffect } from 'react';
import './App.css'; // Certifique-se de ter o estilo CSS adequado

const AcceptBet = () => {
  const [participants, setParticipants] = useState([
    { name: 'Apostador A', wallet: '0x123...', betAmount: 10 },
    // Adicione outros participantes conforme necessário
  ]);

  const [judgeInfo, setJudgeInfo] = useState({
    votes: 0,
    percentage: 0,
    result: 'Aguardando decisão',
    winners: [],
  });

  // Adicionando useEffect para logar dados no console
  useEffect(() => {
    console.log('Dados de participants:', participants);
    console.log('Dados de judgeInfo:', judgeInfo);
  }, [participants, judgeInfo]);

  return (
    <>
      <div className="accept-bet-container">
        <div className="participants-info">
          {participants.map((participant, index) => (
            <div key={index}>
              <h3>{participant.name}</h3>
              <p>Carteira: {participant.wallet}</p>
              <p>Valor Apostado: {participant.betAmount}</p>
            </div>
          ))}
        </div>

        <div className="judge-info">
          <h3>Informações do Juiz</h3>
          <p>Número de Votos: {judgeInfo.votes}</p>
          <p>Porcentagem em Relação ao Total de Votos: {judgeInfo.percentage}%</p>
          <p>Resultado Final: {judgeInfo.result}</p>
          <p>Ganhadores: {judgeInfo.winners.join(', ')}</p>
        </div>
      </div>
    </>
  );
};

export default AcceptBet;
