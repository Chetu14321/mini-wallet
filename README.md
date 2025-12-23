# Mini-Wallet Service

## Overview
A simple wallet system that allows users to create accounts, check balances, and transfer money safely.

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- Jest + Supertest

## Features
- Create wallet with initial balance
- Get user balance
- Transfer money between users
- Prevent negative balances
- Integration test for transfer

## API Endpoints

### Create Wallet
### POST /api/wallet

{
  "userId": "alice",
  "initialBalance": 100
}

res:
{
  "userId": "alice",
  "balance": 100
}


### Get Wallet Balance

### GET /api/wallet/:userId

Example:

GET /api/wallet/alice


Response:

{
  "userId": "alice",
  "balance": 100
}

### Transfer Money

### POST /api/transfer

Request Body:

{
  "fromUserId": "alice",
  "toUserId": "bob",
  "amount": 50
}


Response:

{
  "message": "Transfer successful"
}

 ### Running the Project Locally
  - 1. Clone the Repository
    git clone <your-github-repository-url>
    cd mini-wallet

  - 2. Install Dependencies
    npm install

  - 3. Environment Setup

### Create a .env file in the root directory:

MONGO_URI=mongodb://127.0.0.1:27017/mini_wallet
PORT=3000

### 4. Start the Server
    npm start


### The server will run at:

- http://localhost:3000

- Testing

- An integration test is included to validate the transfer functionality.

- Test Scenario

- Alice starts with balance 100

- Bob starts with balance 100

- Alice sends 50 to Bob

- Final balances:

- Alice → 50

- Bob → 150

### Run Tests
- npm test


