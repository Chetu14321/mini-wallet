const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const walletRoutes = require("./routes/wallet.routes");
const path=require('path')

dotenv.config();

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// app.use(express.static("./build"))
// app.use(express.static(path.join(__dirname, "mini-wallet-frontend", "build")));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api", walletRoutes);


// Serve frontend build
// Serve frontend build (for production)
app.use(express.static(path.join(__dirname, "../mini-wallet-frontend/dist")));

// Catch-all handler for React (Express 5 SAFE)
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../mini-wallet-frontend/dist/index.html")
  );
});




const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // 👈 REQUIRED for testing
