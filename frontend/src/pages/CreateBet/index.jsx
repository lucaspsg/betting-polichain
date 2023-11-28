import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import bettingAbi from '../../abi'

const CreateBet = () => {
  const navigate = useNavigate();
  const [betDetails, setBetDetails] = useState({
    name: '',
    side1: '',
    side2: ''
  });

    const { config } = usePrepareContractWrite({
        address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        // address: '0x2F92d9da6E2d9587B075Ba408ef03ED911160062',
        abi: bettingAbi,
        functionName: 'createBet',
        args: [betDetails.name, betDetails.side1, betDetails.side2],
    })
    const { write: createBet } = useContractWrite(config)


  return (
    <>
        <Navbar navigate={navigate} />
        <div className="start-bet-container centralize-content">
          <h2 className="betting-title">Create Bet</h2>
          <div className="input-container">
            <input
              className="bet-input"
              type="text"
              placeholder="Bet Name"
              value={betDetails.name}
              onChange={(e) => setBetDetails({ ...betDetails, name: e.target.value })}
            />
          </div>

        <div className="input-container">
          <input
            className="bet-input"
            type="text"
            placeholder="Outcome 1"
            value={betDetails.side1}
            onChange={(e) => setBetDetails({ ...betDetails, side1: e.target.value })}
          />
        </div>

        <div className="input-container">
          <input
            className="bet-input"
            type="text"
            placeholder="Outcome 2"
            value={betDetails.side2}
            onChange={(e) => setBetDetails({ ...betDetails, side2: e.target.value })}
          />
        </div>

          <button onClick={() => createBet?.()} className="start-bet-button" style={{ marginTop: '10px' }}>
            Create Bet
          </button>
        </div>
      <Footer/>
    </>
  );
};

export default CreateBet;
