import React from 'react';
import { ethers } from 'ethers';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
        <Typography component="h2" variant="h4" sx={{ m: 3 }}>
          {accounts[0]}
        </Typography>
      ) : (
        <Button onClick={requestAccounts}
          fullWidth
          variant="contained"
          sx={{ m: 3 }}>
          Connect with MetaMask
        </Button>
      )}
    </>
  );
};

export default Account;