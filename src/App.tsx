import React, { useState } from 'react';
import { ethers } from 'ethers';
import tokenContractAbi from './abi/tokenContract.json';
import cTokenContractAbi from './abi/cTokenContract.json';
import TokenBalance from './components/TokenBalance';
import TransactionHistory from './components/TransactionHistory';
import { DAI_CONTRACT_ADDRESS, CDAI_CONTRACT_ADDRESS } from './constants/contracts';
import './App.css';

declare global {
  interface Window {
    ethereum?: any
  }
};

function App() {
  // TODO: Needed?
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [tokenContract, setTokenContract] = useState<ethers.Contract>();
  const [cTokenContract, setCTokenContract] = useState<ethers.Contract>();

  const [accountAddress, setAccountAddress] = useState<string>();
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [cTokenBalance, setCTokenBalance] = useState<number>(0);
  const [history, setHistory] = useState<ethers.Transaction[]>(new Array<ethers.Transaction>());

  const accountChangeHandler = (accountAddress: string) => {
    setAccountAddress(accountAddress);
  };

  // TODO: Reuse these two

  const getTokenBalance = async (accountAddress: string, contract: ethers.Contract) => {
    let balance = await contract.balanceOf(accountAddress);
    setTokenBalance(balance);
  }

  const getCTokenBalance = async (accountAddress: string, contract: ethers.Contract) => {
    let balance = await contract.balanceOf(accountAddress);
    setCTokenBalance(balance);
  }

  async function supply() {
    const tokenDecimals = 18;
    const tokensToSupply = 1 * Math.pow(10, tokenDecimals);

    let tx = await tokenContract?.approve(CDAI_CONTRACT_ADDRESS, tokensToSupply.toString());
    await tx.wait(1);

    tx = await cTokenContract?.mint(tokensToSupply.toString());
    await tx.wait(1);
  }

  async function getTransactionHistory(accountAddress: string) {
    // TODO: Improve
    let provider = new ethers.providers.EtherscanProvider('kovan');
    let history = await provider.getHistory(accountAddress);
    setHistory(history);
  }

  async function requestAccounts() {
    let temporalProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(temporalProvider);

    const signer = temporalProvider.getSigner();

    let temporalTokenContract = new ethers.Contract(DAI_CONTRACT_ADDRESS, tokenContractAbi, signer);
    setTokenContract(temporalTokenContract);

    let temporalCTokenContract = new ethers.Contract(CDAI_CONTRACT_ADDRESS, cTokenContractAbi, signer);
    setCTokenContract(temporalCTokenContract);

    try {
      let accounts = await temporalProvider.send('eth_requestAccounts', []);
      accountChangeHandler(accounts[0]);
      await getTokenBalance(accounts[0], temporalTokenContract);
      await getCTokenBalance(accounts[0], temporalCTokenContract);
      await getTransactionHistory(accounts[0]);
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
          <TokenBalance name={'DAI'} decimals={18} value={tokenBalance} />
          <TokenBalance name={'cDAI'} decimals={8} value={cTokenBalance} />
          <TransactionHistory history={history} />
          <button onClick={supply}>
            Supply 1 DAI
          </button>
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
