require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const Prize = require('./models/Prize');

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
 

app.get("/api/draw", async (req, res) => {
  try {
    // Find all available prizes
    const prizes = await Prize.find({ $or: [{ isLimited: false }, { count: { $gt: 0 } }] });

    if (prizes.length === 0) {
      return res.json({ message: "All prizes are claimed!" });
    }

    // Randomly select a prize
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];

    // If limited, decrease count
    if (prize.isLimited) {
      prize.count -= 1;
      await prize.save();
    }

    res.json({ message: `🎉 You won: ${prize.name}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.listen(PORT,()=>{
    console.log(`Server is started At PORT:${PORT}`);
});