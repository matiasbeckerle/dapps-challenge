import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractAbi from './contractAbi.json';
import './App.css';

// TODO: Move
declare global {
  interface Window {
    ethereum?: any
  }
};

const CONTRACT_ADDRESS = '0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD';

function App() {
  // TODO: Needed?
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [contract, setContract] = useState<ethers.Contract>();

  const [accountAddress, setAccountAddress] = useState<string>();
  const [balance, setBalance] = useState<number>();

  const accountChangeHandler = (accountAddress: string) => {
    setAccountAddress(accountAddress);
  };

  const getBalance = async (accountAddress: string, contract: ethers.Contract) => {
    let balance = await contract.balanceOf(accountAddress) / Math.pow(10, 2);
    setBalance(balance);
  }

  async function requestAccounts() {
    let temporalProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(temporalProvider);
    let temporalContract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, temporalProvider);
    setContract(temporalContract);

    try {
      let accounts = await temporalProvider.send('eth_requestAccounts', []);
      accountChangeHandler(accounts[0]);
      await getBalance(accounts[0], temporalContract);
    } catch (error) {
      console.error(error);
      alert('Need to sign in to MetaMask');
    }
  }

  // TODO: Create smaller components.

  return (
    <div className="App">
      <header>
        <h1>dApp challenge</h1>
      </header>
      {accountAddress ? (
        <div>
          <h2>{accountAddress}</h2>
          <p>cDAI balance: {balance}</p>
        </div>
      ) : (
        <button onClick={requestAccounts}>
          Connect with MetaMask
        </button>
      )}
    </div>
  );
}

export default App;
