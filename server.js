import dotenv from "dotenv";
dotenv.config();

console.log("API KEY =", process.env.OPENAI_API_KEY);
console.log("ALL ENV =", process.env);

import express from "express";
import OpenAI from "openai";

const app = express();

app.use(express.json());

console.log("Starting server...");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Server is working");
});


// ✅ EXISTING ROUTE (you already had this)
app.post("/ask", async (req, res) => {
  try {
    console.log("Request received");

    const { question } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: question,
    });

    res.json({
      answer: response.output_text,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});


// ✅ NEW REQUIRED ROUTE: NEXT SKILL SUGGESTION
app.get("/suggest-skill", async (req, res) => {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input:
        "Suggest the next skill to learn for a student who already knows JavaScript. Keep it short and practical."
    });

    res.json({
      suggestion: response.output_text,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to generate skill suggestion",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});