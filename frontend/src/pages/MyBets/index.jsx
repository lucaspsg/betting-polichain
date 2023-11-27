import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3'; 
//import BettingContract from 'backend/contracts/Betting.sol';
import './styles.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import Contract from 'truffle-contract';

const MyBets = () => {
  const { betId } = useParams();
  const [bets, setBets] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const newWeb3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const networkId = await newWeb3.eth.net.getId();
        const deployedNetwork = BettingContract.networks[networkId];

        const bettingContract = Contract(BettingContract);
        bettingContract.setProvider(newWeb3.currentProvider);

        const newContract = await bettingContract.at(deployedNetwork.address);

        setWeb3(newWeb3);
        setContract(newContract);

        // Carrega os detalhes da aposta ao montar o componente
        fetchBetDetails();
      } else {
        console.error('MetaMask not installed');
      }
    };

    initializeWeb3();
  }, []);

  const fetchBetDetails = async () => {
    try {
      // Faz chamadas aos métodos do contrato
      const betDetails = await contract.getBetDetails(betId).call();

      // Atualiza o estado com os detalhes da aposta
      setBets([betDetails]);
    } catch (error) {
      console.error('Error fetching bet details:', error);
    }
  };

  return (
    <>
      <Navbar />
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
                <p>Amount Won: {bet.amountWon || 'Pending'}</p>
                <p>Bet Date and Time: {bet.betDateTime || 'Not available'}</p>
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

