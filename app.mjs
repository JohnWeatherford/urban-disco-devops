import 'dotenv/config';
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uri = process.env.MONGO_URI;

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

// MongoDB Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// CONNECT TO MONGODB
await client.connect();
console.log("Connected to MongoDB");

// HOME PAGE
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'projects.html'));
});

// READ ALL PROJECTS
app.get('/api/projects', async (req, res) => {
  try {
    const db = client.db('cis486');
    const collection = db.collection('projects');

    const records = await collection.find({}).toArray();

    res.json(records);

  } catch (error) {
    console.error('Error reading projects:', error);
    res.status(500).json({ error: 'Failed to get projects' });
  }
});


// POPULATE DATABASE WITH PROJECTS
app.get('/api/populate-projects', async (req, res) => {
  try {

    const db = client.db('cis486');
    const collection = db.collection('projects');

    const starterData = [
      {
        title: "Alpha Project",
        date: "September 17, 2025",
        description: "Multi-page static site using HTML and CSS.",
        project: "https://github.com/JohnWeatherford/Alpha-Project",
        image: "images/alpha-screenshot.png"
      },
      {
        title: "Clue-Meister",
        date: "Jan to May 2025",
        description: "Escape room clue tracking system.",
        project: "https://github.com",
        image: "images/clue-meister.png"
      },
      {
        title: "Project Bravo",
        date: "October 13, 2025",
        description: "Hello World code knowledge game.",
        game: "https://johnweatherford.github.io/vigilant-doodle-bravo/",
        project: "https://github.com/JohnWeatherford/vigilant-doodle-bravo",
        image: "images/Screenshot.png"
      }
    ];

    const result = await collection.insertMany(starterData);

    res.json({
      message: "Projects inserted",
      inserted: result.insertedCount
    });

  } catch (error) {
    console.error("Populate error:", error);
    res.status(500).json({ error: "Failed to populate database" });
  }
});


// PAGE TO TRIGGER POPULATION
app.get('/populate-projects', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'populate-projects.html'));
});


// START SERVER
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});