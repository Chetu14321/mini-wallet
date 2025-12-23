import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "/api";

function App() {
  // create wallet
  const [newUser, setNewUser] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  // wallet list
  const [wallets, setWallets] = useState([]);

  // transfer
  const [fromUser, setFromUser] = useState("");
  const [toUser, setToUser] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  // load wallets
  const loadWallets = async () => {
    const res = await fetch(`${BASE_URL}/wallets`);
    const data = await res.json();
    setWallets(data);
  };

  useEffect(() => {
    loadWallets();
  }, []);

  const createWallet = async () => {
    await fetch(`${BASE_URL}/wallet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: newUser,
        initialBalance: Number(initialBalance)
      })
    });
    setNewUser("");
    setInitialBalance("");
    loadWallets();
  };

  const transferMoney = async () => {
    const res = await fetch(`${BASE_URL}/transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromUserId: fromUser,
        toUserId: toUser,
        amount: Number(amount)
      })
    });
    const data = await res.json();
    setMessage(data.message);
    loadWallets();
  };

  return (
  <div className="page">
    <div className="container">
      <h1 className="title">Mini Wallet</h1>
      <p className="subtitle">Simple wallet system for transfers</p>

      {/* Create Wallet */}
      <div className="card">
        <h3>Create Wallet</h3>
        <input
          placeholder="User ID"
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
        />
        <input
          type="number"
          placeholder="Initial Balance"
          value={initialBalance}
          onChange={e => setInitialBalance(e.target.value)}
        />
        <button onClick={createWallet}>Create Wallet</button>
      </div>

      {/* Wallet List */}
      <div className="card">
        <h3>Wallets</h3>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map(w => (
              <tr key={w.userId}>
                <td>{w.userId}</td>
                <td>₹ {w.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transfer */}
      <div className="card">
        <h3>Send Money</h3>
        <input placeholder="From User" onChange={e => setFromUser(e.target.value)} />
        <input placeholder="To User" onChange={e => setToUser(e.target.value)} />
        <input type="number" placeholder="Amount" onChange={e => setAmount(e.target.value)} />
        <button className="secondary" onClick={transferMoney}>
          Transfer
        </button>
        {message && <p className="success">{message}</p>}
      </div>
    </div>
  </div>
);

}

export default App;
