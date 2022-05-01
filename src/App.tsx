import { useState } from 'react';
import { ethers } from 'ethers';
import { Box, Container, Typography } from '@mui/material';
import AccountConnect from './components/AccountConnect';
import Account from './components/Account';
import './App.css';

declare global {
  interface Window {
    ethereum?: any
  }
};

function App() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [accounts, setAccounts] = useState<string[]>([]);

  return (
    <Container maxWidth="sm" className="App">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h2" sx={{ m: 3 }}>
          dApp challenge
        </Typography>
        <AccountConnect accounts={accounts} setAccounts={setAccounts} setProvider={setProvider} />
        <Account provider={provider} accounts={accounts}></Account>
      </Box>
    </Container>
  );
}

export default App;
