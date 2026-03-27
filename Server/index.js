require('dotenv').config(); // Load environment variables first
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Plant = require('./models/plant.model');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
// Your MongoDB connection string
const MONGO_URL = "mongodb+srv://vasukelwin911_db_user:131422Vt@cluster0.mdxwwky.mongodb.net/HerbVeda?retryWrites=true&w=majority&appName=Cluster0";

// --- DATABASE CONNECTION ---
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Successfully connected to mongoDB!');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// --- AI INITIALIZATION (Gemini) ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- ROUTES ---

// Health Check
app.get('/', (req, res) => {
  res.send('Hello from the Herbal Garden API!');
});

/** * 1. SEARCH ROUTE (Specific path first)
 * Matches: /api/plants/search?query=tulsi
 */
app.get('/api/plants/search', async (req, res) => {
  try {
    const { query } = req.query; 
    
    if (!query) {
      return res.status(200).json([]); 
    }

    const plants = await Plant.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { ailments: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json(plants);
  } catch (error) {
    console.error("Search Route Error:", error.message);
    res.status(500).json({ message: 'Server Error during search' });
  }
});

/** * 2. GET ALL PLANTS
 * Matches: /api/plants
 */
app.get('/api/plants', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (error) {
    console.error("Fetch All Error:", error.message);
    res.status(500).json({ message: 'Error fetching all plants' });
  }
});

/** * 3. GET BY ID (Dynamic parameter last)
 * Matches: /api/plants/65f...
 */
app.get('/api/plants/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Safety check: prevents "Cast to ObjectId" crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const plant = await Plant.findById(id);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });

    res.status(200).json(plant);
  } catch (error) {
    console.error("ID Route Error:", error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

/** * 4. ASKVEDA (Gemini AI Chat)
 */
app.post('/api/askveda', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    // Context Retrieval
    const relevantPlants = await Plant.find({
      $or: [
        { name: { $regex: question, $options: 'i' } },
        { ailments: { $regex: question, $options: 'i' } }
      ]
    }).limit(3);

    let contextData = relevantPlants.length > 0 
      ? relevantPlants.map(p => `- ${p.name}: ${p.medicinalUse}`).join("\n")
      : "No specific herb matches found in DB.";

    const prompt = `
      You are "AskVeda", an Ayurvedic expert. 
      Context from DB: ${contextData}
      User Question: ${question}
      Answer concisely and include the disclaimer: "Consult a doctor before starting treatment."
    `;

    const result = await aiModel.generateContent(prompt);
    res.json({ answer: result.response.text() });

  } catch (error) {
    console.error("AskVeda Error:", error);
    res.status(500).json({ message: "AI is currently unavailable." });
  }
});
