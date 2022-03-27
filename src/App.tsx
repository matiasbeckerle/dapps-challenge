import React from 'react';
import { ethers } from 'ethers';
import './App.css';

// TODO: Move
declare global {
  interface Window {
    ethereum?: any
  }
};

// TODO: Probably not a good place
const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  async function requestAccount() {
    try {
      await provider.send('eth_requestAccounts', []);
    } catch (error) {
      alert('Need to sign in to MetaMask');
    }
  }

  return (
    <div className="App">
      <header>
        <h1>dApp challenge</h1>
      </header>
      <button onClick={requestAccount}>
        Connect with MetaMask
      </button>
    </div>
  );
}

export default App;
