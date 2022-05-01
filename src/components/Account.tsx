import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Alert, Button } from '@mui/material';
import TokenBalance from './TokenBalance';
import TransactionHistory from './TransactionHistory';

import tokenContractAbi from '../abi/tokenContract.json';
import cTokenContractAbi from '../abi/cTokenContract.json';
import { DAI_CONTRACT_ADDRESS, CDAI_CONTRACT_ADDRESS } from '../constants/contracts';

interface Props {
  provider: ethers.providers.Web3Provider | undefined,
  accounts: string[];
};

const Account = ({ provider, accounts }: Props) => {
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [cTokenBalance, setCTokenBalance] = useState<number>(0);

  const [tokenContract, setTokenContract] = useState<ethers.Contract>();
  const [cTokenContract, setCTokenContract] = useState<ethers.Contract>();

  const [history, setHistory] = useState<ethers.Transaction[]>(new Array<ethers.Transaction>());

  async function getTokenBalance(accountAddress: string, contract: ethers.Contract) {
    return await contract.balanceOf(accountAddress);
  }

  async function getTransactionHistory(accountAddress: string) {
    let provider = new ethers.providers.EtherscanProvider('kovan');
    let history = await provider.getHistory(accountAddress);
    return history;
  }

  async function supply() {
    const tokenDecimals = 18;
    const tokensToSupply = 1 * Math.pow(10, tokenDecimals);

    let tx = await tokenContract?.approve(CDAI_CONTRACT_ADDRESS, tokensToSupply.toString());
    await tx.wait(1);

    tx = await cTokenContract?.mint(tokensToSupply.toString());
    await tx.wait(1);
  }

  const isConnected = accounts.length > 0;

  useEffect(() => {
    if (!isConnected || !provider) return;

    const signer = provider.getSigner();

    let temporalTokenContract = new ethers.Contract(DAI_CONTRACT_ADDRESS, tokenContractAbi, signer);
    setTokenContract(temporalTokenContract);

    let temporalCTokenContract = new ethers.Contract(CDAI_CONTRACT_ADDRESS, cTokenContractAbi, signer);
    setCTokenContract(temporalCTokenContract);

    getTokenBalance(accounts[0], temporalTokenContract)
      .then((balance: number) => {
        setTokenBalance(balance);
      });

    getTokenBalance(accounts[0], temporalCTokenContract)
      .then((balance: number) => {
        setCTokenBalance(balance);
      });

    getTransactionHistory(accounts[0])
      .then((history: ethers.Transaction[]) => {
        setHistory(history);
      });
  }, [isConnected, accounts, provider]);

  return (
    <>
      {isConnected ? (
        <>
          <TokenBalance name={'DAI'} decimals={18} value={tokenBalance} />
          <TokenBalance name={'cDAI'} decimals={8} value={cTokenBalance} />
          <TransactionHistory history={history} />
          <Button onClick={supply}
            fullWidth
            variant="contained"
            sx={{ m: 3 }}>
            Supply 1 DAI
          </Button>
        </>
      ) : (
        <Alert severity="info" sx={{ m: 3 }}>Please connect to continue.</Alert>
      )}
    </>
  );
}

export default Account;