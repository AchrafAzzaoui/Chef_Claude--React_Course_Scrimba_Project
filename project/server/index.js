import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from 'express-rate-limit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, ".env");
const result = dotenv.config({ path: envPath });

import express from "express";
import cors from "cors";
import { Anthropic } from "@anthropic-ai/sdk";

const PORT = process.env.PORT || 3000;
const app = express();

const allowedOrigins = [
  'http://localhost:5174',
  'https://your-netlify-app.netlify.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

app.get("/api/test", (req, res) => {
  console.log(process.env.CLAUDE_API_KEY);
  const apiKey = process.env.CLAUDE_API_KEY;
  res.json({ message: "server is running", hasApiKey: !!apiKey });
});

app.post("/api/generateRecipe", async (req, res) => {
  try {
    const ingredients = req.body.ingredients;
    const ingredientsString = ingredients.join(",");
    const SYSTEM_PROMPT = `
  You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
  `;
    const messages = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
    });
    const recipe = messages.content[0].text;
    res.json({ recipe });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Add rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply to all routes
app.use(limiter);

// Add monthly usage tracking
let monthlyRequests = 0;
const MONTHLY_LIMIT = 1000; // Adjust based on your needs

app.use((req, res, next) => {
  monthlyRequests++;
  if (monthlyRequests > MONTHLY_LIMIT) {
    return res.status(429).json({ 
      error: 'Monthly limit reached. Service will reset next month.' 
    });
  }
  next();
});

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('API Key present:', !!process.env.CLAUDE_API_KEY);
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
      PORT = PORT + 1;
      startServer();
    } else {
      console.error('Server error:', error);
    }
  }
};

startServer();
