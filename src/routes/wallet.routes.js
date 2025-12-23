const express = require("express");
const router = express.Router();

const {
  createWallet,
  getBalance,
  transferMoney,getAllWallets
} = require("../controllers/wallet.controller");

// create wallet
router.post("/wallet", createWallet);

// get balance
router.get("/wallet/:userId", getBalance);

// 🔥 THIS MUST EXIST (exact match)
router.post("/transfer", transferMoney);
router.get("/wallets", getAllWallets);


module.exports = router;
