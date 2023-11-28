import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { usePrepareContractWrite, useContractRead, useContractWrite } from 'wagmi';
import bettingAbi from '../../abi.js';
import './styles.css';

const Home = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(BigInt(0));
  const [betId, setBetId] = useState(BigInt(0));
  const [betSide, setBetSide] = useState(false);
  const [validationSide, setValidationSide] = useState(false);
  const [gambiarraBet, setGambiarraBet] = useState(0);
  const [gambiarraValidation, setGambiarraValidation] = useState(0);

  useEffect(() => {
    console.log("make bet chamado");
    makeBet?.();
  }, [gambiarraBet]);

  useEffect(() => {
    console.log("validate chamado");
    subscribeAsValidator?.();
  }, [gambiarraValidation]);

  let { data: bets } = useContractRead({
    // address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    address: '0x2F92d9da6E2d9587B075Ba408ef03ED911160062',
    abi: bettingAbi,
    functionName: 'getOpenBets',
  });

  const { config: makeBetConfig } = usePrepareContractWrite({
    // address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    address: '0x2F92d9da6E2d9587B075Ba408ef03ED911160062',
    abi: bettingAbi,
    functionName: 'makeBet',
    args: [betId, betSide],
    value: qty,
  });
  const { write: makeBet } = useContractWrite(makeBetConfig);

  const { config: subscribeAsValidatorConfig } = usePrepareContractWrite({
    // address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    address: '0x2F92d9da6E2d9587B075Ba408ef03ED911160062',
    abi: bettingAbi,
    functionName: 'subscribeAsValidator',
    args: [betId, validationSide],
    value: qty,
  });
  const { write: subscribeAsValidator } = useContractWrite(subscribeAsValidatorConfig);

  return (
    <>
      <Navbar navigate={navigate}/>
      <h2 className="betting-title">Bets</h2>
      <div className="information-box">
        <p>Bet on outcome: Choose your side to bet.</p>
        <p>Validate outcome: Provide the final result of your bet.</p>
      </div>
      <div className="bets-container centralize-content">
        <div className="bet-list">
          {bets?.map((bet) => (
            <div key={bet.betId} className="bet-card">
              <h3>{bet.name}</h3>
              <p>Outcome 1: {bet.side1}</p>
              <p>Outcome 2: {bet.side2}</p>
              <p>Amount: {Number(bet.amount)}</p>
              <div className='buttons-div'>
                <button className='buttons' onClick={() => {
                  setBetId(bet.betId)
                  setBetSide(false)
                  setGambiarraBet(gambiarraBet+1)
                }}> Bet on Outcome 1 </button>
                <button className='buttons' onClick={() => {
                  setBetId(bet.betId)
                  setBetSide(true)
                  setGambiarraBet(gambiarraBet+1)
                }}> Bet on Outcome 2 </button>
                <button className='buttons' onClick={() => {
                  setBetId(bet.betId)
                  setValidationSide(false)
                  setGambiarraValidation(gambiarraValidation+1)
                }}> Validate Outcome 1 </button>
                <button className='buttons' onClick={() => {
                  setBetId(bet.betId)
                  setValidationSide(true)
                  setGambiarraValidation(gambiarraValidation+1)
                }}> Validate Outcome 2 </button>
              </div>
              <div className="input-container">
                <label htmlFor="bet-input" className="bet-input-label">
                  Bet Amount (Wei):
                </label>
                <input
                  id="bet-input"
                  className="bet-input"
                  type="text"
                  placeholder="Enter bet amount"
                  value={Number(qty)}
                  onChange={(e) => setQty(BigInt(e.target.value))}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
