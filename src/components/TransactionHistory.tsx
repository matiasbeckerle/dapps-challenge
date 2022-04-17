import { ethers } from 'ethers';

interface Props {
  history: ethers.Transaction[];
}

const TransactionHistory = ({ history }: Props) => {
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