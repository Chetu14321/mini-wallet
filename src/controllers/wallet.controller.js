const mongoose = require("mongoose");
const Wallet = require("../models/Wallet");

/* =====================
   CREATE WALLET
===================== */
exports.createWallet = async (req, res) => {
  try {
    const { userId, initialBalance } = req.body;

    if (!userId || initialBalance < 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const wallet = await Wallet.create({
      userId,
      balance: initialBalance
    });

    res.status(201).json({
      userId: wallet.userId,
      balance: wallet.balance
    });
  } catch (err) {
    res.status(400).json({
      message: "Wallet creation failed",
      error: err.message
    });
  }
};

/* =====================
   GET BALANCE
===================== */
exports.getBalance = async (req, res) => {
  const { userId } = req.params;

  const wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    userId: wallet.userId,
    balance: wallet.balance
  });
};

/* =====================
   TRANSFER MONEY (ATOMIC)
===================== */
// const Wallet = require("../models/Wallet");

exports.transferMoney = async (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;

  // validation
  if (!fromUserId || !toUserId || amount <= 0) {
    return res.status(400).json({ message: "Invalid transfer request" });
  }

  const sender = await Wallet.findOne({ userId: fromUserId });
  const receiver = await Wallet.findOne({ userId: toUserId });

  if (!sender || !receiver) {
    return res.status(400).json({ message: "User not found" });
  }

  if (sender.balance < amount) {
    return res.status(400).json({ message: "Insufficient funds" });
  }

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save();
  await receiver.save();

  res.status(200).json({
    message: "Transfer successful"
  });
};

exports.getAllWallets = async (req, res) => {
  const wallets = await Wallet.find({}, { _id: 0, userId: 1, balance: 1 });
  res.json(wallets);
};
