import { FC } from 'react';
import { ethers } from 'ethers';

interface TransactionHistory {
  history: ethers.Transaction[];
}

const TransactionHistory: FC<TransactionHistory> = ({ history }) => {
  return (
    <>
      <h2>History</h2>
      <table>
        <thead>
          <tr>
            <th>Hash</th>
          </tr>
        </thead>
        <tbody>
          {history?.map((transaction, i) => {
            return (
              <tr key={i}>
                <td>{transaction.hash}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TransactionHistory;