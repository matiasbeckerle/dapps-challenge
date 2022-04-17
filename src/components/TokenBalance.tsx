interface Props {
  name: string;
  decimals: number;
  value: number
};

const TokenBalance = ({ name, decimals, value }: Props) => {
  const balance = value / Math.pow(10, decimals);
  return (
    <p>{name} balance: {balance}</p>
  );
};

export default TokenBalance;