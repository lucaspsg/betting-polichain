import React, { useEffect } from 'react';
import './styles.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useNavigate } from 'react-router-dom';

const generateCoinImageCss = (n) => ({
        width: '20%',
        height: '200%',
        position: 'absolute',
        left: `${n*10}%`,
        z_index: `${n}`,
});

const generateCoinsDivCss = (n) => ({
    width: "110%",
    align_items: "center",
    height: "25%",
    overflow: "hidden",
    left: "-10%",
    position: "absolute",
    bottom: `${n*5}%`

})

const Login = () => {
    const navigate = useNavigate();
    const { isConnected } = useAccount();
    useEffect(() => {
        if (isConnected) navigate("/create-bet")
    }, [isConnected])

    const connectButton = <ConnectButton label="Login" />
    return (
        <>
            <div className='main-div'>
                <div className="div-title-and-login">
                    <h1 className='title'> Betting.gg </h1>
                    {connectButton}
                </div>
                <img src="assets/spongebob.png" className='spongebob-image' />
                {
                    [...Array(5).keys()].map(function(n) {
                        return (
                            <div style={generateCoinsDivCss(n)} key={`coin-div-${n}`}>
                                {
                                    [...Array(10).keys()].map(function(n) {
                                        return <img src="assets/coins.png" style={generateCoinImageCss(n)} key={`coin-${n}`}/>
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default Login;
