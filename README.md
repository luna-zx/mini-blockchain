# 🔗 Mini Blockchain with NodeJS & MongoDB

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green.svg)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg)](https://www.typescriptlang.org/)

---

## ⚙️ Tech Stack

- **Express.js** – API
- **Mongoose.js** – ODM Library for MongoDB 
- **TypeScript** – Type-safety
- **Swagger** – API Documentation

---

## 🚀 Features

- **Genesis Block**: Creates the first block in the blockchain.
- **Add Block**: Add new blocks to the blockchain.
- **Get Chain**: Get all blocks from the blockchain stored in the Mongo database.
- **Validate Chain**: Verify the integrity of the blockchain by checking that each block hash is correct and that the previous hash matches the current block.

---

## 📦 Installation

```bash
git clone https://github.com/luna-zx/mini-blockchain.git
cd mini-blockchain
npm i
npm run build
```

## 🧪 Set Environment Variables

```env
MONGO_URL = # your MongoDB connection url
PORT = # your API port
```

## ▶️ Start App

```bash
npm start
```

## 📃 Testing

After starting the app,
go to API docs (swagger) at: `http://localhost:<YOUR_API_PORT>`