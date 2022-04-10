import { FC } from 'react';

interface TokenBalance {
  name: string;
  decimals: number;
  value: number
};

const TokenBalance: FC<TokenBalance> = ({ name, decimals, value }) => {
  const balance = value / Math.pow(10, decimals);
  return (
    <>
      <p>{name} balance: {balance}</p>
    </>
  );
};

export default TokenBalance;