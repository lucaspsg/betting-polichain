// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const Login = () => {
  const [userData, setUserData] = useState({
    nickname: '',
    wallet: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleJoin = () => {
    // Lógica para processar dados antes de navegar para a próxima página
    navigate('/start');
  };

  return (
    <div className="login-container">
      <h2 className="betting-title">Betting Polichain</h2>
      <div className="input-container">
        <input
          className="login-input"
          type="text"
          placeholder="Nickname"
          value={userData.nickname}
          onChange={(e) => handleInputChange('nickname', e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          className="login-input"
          type="text"
          placeholder="Carteira"
          value={userData.wallet}
          onChange={(e) => handleInputChange('wallet', e.target.value)}
        />
      </div>
      <button onClick={handleJoin} className="join-button">
        Participar
      </button>
    </div>
  );
};

export default Login;