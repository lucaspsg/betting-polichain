import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAccount,
         useContractRead,
         useContractWrite,
         usePrepareContractWrite } from 'wagmi';
import bettingAbi from '../../abi'

const MyBets = () => {
    const navigate = useNavigate();
    const { address } = useAccount();
    const [betId, setBetId] = useState(BigInt(0))

    useEffect(() => closeBet?.(), [betId])

    let { data: bets }= useContractRead({
        address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        abi: bettingAbi,
        functionName: 'getOpenBets',
    })
    bets = bets.filter(bet => bet.owner == address)


    const { config } = usePrepareContractWrite({
        address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        abi: bettingAbi,
        functionName: 'closeBet',
        args: [betId],
    })

    const { write: closeBet, isSuccess } = useContractWrite(config)

  return (
    <>
      <Navbar navigate={navigate}/>
      <div className="my-bets-container centralize-content">
        <h2 className="betting-title">My Bets</h2>
        {bets.length === 0 ? (
          <p>No bets found.</p>
        ) : (
          <div className="bet-list">
            {bets.map((bet) => (
              <div key={bet.betId} className="bet-card">
                <h3>{bet.name}</h3>
                <p>Outcome 1: {bet.side1}</p>
                <p>Outcome 2: {bet.side2}</p>
                <p>Amount: {Number(bet.amount)}</p>
                <button onClick={() => setBetId(bet.betId)}> Close Bet </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default MyBets;

