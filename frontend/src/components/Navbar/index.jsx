import React, { useEffect } from 'react';
import './styles.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = ({navigate}) => {
    return (
        <>
            <div className="navbar-container">
                <div className="routes">
                    <p className="route-p" onClick={() => navigate("/home")}> Home </p> 
                    <p className="route-p" onClick={() => navigate("/create-bet")}> Create Bet</p> 
                    <p className="route-p" onClick={() => navigate("/my-bets")}> My Bets </p> 
                </div>
                <div className="wallet-div">
                    <ConnectButton />
                </div>
            </div>
        </>
    );
}

export default Navbar;
