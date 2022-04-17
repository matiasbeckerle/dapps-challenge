import React from 'react';
import { ethers } from 'ethers';

interface Props {
  accounts: string[];
  setAccounts: React.Dispatch<React.SetStateAction<string[]>>;
  setProvider: React.Dispatch<React.SetStateAction<ethers.providers.Web3Provider | undefined>>;
};

const Account = ({ accounts, setAccounts, setProvider }: Props) => {
  const isConnected = accounts.length > 0;

  async function requestAccounts() {
    let temporalProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(temporalProvider);

    try {
      let accounts = await temporalProvider.send('eth_requestAccounts', []);
      setAccounts(accounts);
    } catch (error) {
      console.error(error);
      alert('Need to sign in to MetaMask');
    }
  }

  return (
    <>
      {isConnected ? (
        <h2>{accounts[0]}</h2>
      ) : (
        <button onClick={requestAccounts}>
          Connect with MetaMask
        </button>
      )}
    </>
  );
};

export default Account;