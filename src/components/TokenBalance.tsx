import { Box, Card, CardContent, Typography } from '@mui/material';

interface Props {
  name: string;
  decimals: number;
  value: number
};

const TokenBalance = ({ name, decimals, value }: Props) => {
  const balance = value / Math.pow(10, decimals);

  const card = (
    <>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          balance
        </Typography>
        <Typography variant="h5">
          {balance}
        </Typography>
      </CardContent>
    </>
  );

  return (
    <Box sx={{ minWidth: 400, m: 1 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default TokenBalance;