const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/server");
const Wallet = require("../src/models/Wallet");

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await mongoose.connect(process.env.MONGO_URI);
});

beforeEach(async () => {
  await Wallet.deleteMany({});

  // Create Alice
  await request(app).post("/api/wallet").send({
    userId: "alice",
    initialBalance: 100
  });

  // Create Bob
  await request(app).post("/api/wallet").send({
    userId: "bob",
    initialBalance: 50
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Transfer Money (Integration Test)", () => {
  test("Alice sends 50 to Bob and balances update correctly", async () => {
    const response = await request(app)
      .post("/api/transfer")
      .send({
        fromUserId: "alice",
        toUserId: "bob",
        amount: 50
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Transfer successful");

    const alice = await request(app).get("/api/wallet/alice");
    const bob = await request(app).get("/api/wallet/bob");

    expect(alice.body.balance).toBe(50);
    expect(bob.body.balance).toBe(100);
  });
});
