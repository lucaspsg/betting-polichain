import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import bettingAbi from '../../abi';

const MyBets = () => {
    const navigate = useNavigate();
    const { address } = useAccount();
    const [betId, setBetId] = useState(BigInt(0));
    const [isScrollable, setIsScrollable] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => closeBet?.(), [betId]);

    let { data: bets } = useContractRead({
        address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        abi: bettingAbi,
        functionName: 'getOpenBets',
    });

    bets = bets && bets.filter(bet => bet.owner === address);

    useEffect(() => {
        if (bets && bets.length > 3) {
            setIsScrollable(true);
            setShowOverlay(true);
        } else {
            setIsScrollable(false);
            setShowOverlay(false);
        }
    }, [bets]);

    const { config } = usePrepareContractWrite({
        address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        abi: bettingAbi,
        functionName: 'closeBet',
        args: [betId],
    });

    const { write: closeBet, isSuccess } = useContractWrite(config);

    const scrollableStyle = isScrollable ? { overflowY: 'scroll', height: '80vh' } : {};
    const overlayStyle = showOverlay ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 } : {};

    return (
      <>
          <Navbar navigate={navigate} />
          <div className="my-bets-container centralize-content">
              <h2 className="betting-title left-align">My Bets</h2> {/* Alterado o título aqui */}
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
          <Footer />
      </>
  );
};
export default MyBets;


