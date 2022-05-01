import { ethers } from 'ethers';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';

interface Props {
  history: ethers.Transaction[];
}

const TransactionHistory = ({ history }: Props) => {
  return (
    <>
      <Typography component="h2" variant="h4" sx={{ mt: 3 }}>
        History
      </Typography>
      {history.length > 0 ? (
        <TableContainer component={Paper} sx={{ m: 3 }}>
          <Table size="small" aria-label="Transaction history">
            <TableHead>
              <TableRow>
                <TableCell>Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history?.map((transaction, i) => {
                return (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {transaction.hash}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>) : (
        <Alert severity="info" sx={{ m: 3 }}>No history at the moment.</Alert>
      )}
    </>
  );
};

export default TransactionHistory;