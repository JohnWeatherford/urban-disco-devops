import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uri = process.env.MONGO_URI;

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

// MongoDB Client (optional)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

await client.connect();
console.log("Connected to MongoDB");

// Starter Projects JSON1

const starterProjects = [
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

// Routes

// Home page
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'projects.html'));
});

// API endpoint to get all projects
app.get('/api/projects', (req, res) => {
  res.json(starterProjects);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});