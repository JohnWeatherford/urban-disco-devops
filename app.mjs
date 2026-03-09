import 'dotenv/config';
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// middlewares aka endpoints aka 'get to slash' {http verb} to slash {you name ur endpoint}
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'projects(1).html'));

})

// READ - Get all projects 
app.get('/api/projects', async (req, res) => {
  try {
    const db = client.db('johnweatherford');
    const collection = db.collection('projects');

    const records = await collection.find({}).toArray();
    
    res.json(records);
  } catch (error) {
    console.error('Error reading attendance:', error);
    res.status(500).json({ error: 'Failed to get attendance records' });
  }
});

// Endpoint to populate MongoDB with starter data
app.get('/api/populate-projects', async (req, res) => {
  try {
    const db = client.db('johnweatherford');
    const collection = db.collection('projects');

    const starterData = [
       {
        "title": "Alpha Project",
        "date": "September 17, 2025",
        "description": "In the Alpha Project I built and deployed a clean, multi-paged static site using HTML and CSS. This project included navbars/footers, semantic markup, accessibility checks, and a full professional workflow (wireframes, README, attribution). The site contained an About/Dev Profile card, a blog section, projects, and resources. It used responsive CSS (Bootstrap 5 or Flex/Grid), Normalize.css, Google Fonts, an advanced selector, and basic JavaScript interactions.",
        "links": "#",
        "project": "https://github.com/JohnWeatherford/Alpha-Project",
        "image": "images/alpha-screenshot.png"
    },
    {
        "title": "Clue-Meister",
        "date": "Jan to May 2025",
        "description": "A group project creating Clue-Meister, a system designed for escape-room hosts. It helped track player progress and deliver clues. Most work involved diagramming and planning user interactions within the system.",
        "links": "#",
        "project": "https://unaedu-my.sharepoint.com/:w:/r/personal/ktrousdale4_una_edu/_layouts/15/doc2.aspx?sourcedoc=%7BA93C9F4A-ACF3-46A8-931E-30D7CFC73B73%7D&file=Final%20Paper%20CIS-330.docx&action=default&mobileredirect=true&DefaultItemOpen=1",
        "image": "images/clue-meister.png"
    },
    {
        "title": "Project Bravo",
        "date": "October 13, 2025",
        "description": "A small game that tests your knowledge of common 'Hello World' code statements.",
        "links": "#",
        "game": "https://johnweatherford.github.io/vigilant-doodle-bravo/",
        "project": "https://github.com/JohnWeatherford/vigilant-doodle-bravo",
        "image": "images/Screenshot.png"
    },
    {
        "title": "Project Charlie",
        "date": "2025-10-26",
        "description": "A small collection of games.",
        "live": "https://znasser46.github.io/project-charlie/",
        "code": "https://github.com/znasser46/project-charlie",
        "image": "images/project_charlie.png"
    },
    {
        "title": "Project Delta",
        "date": "2025-11-03",
        "description": "A web form improvement project that enhances user experience by replacing a small textbox with a dynamic dropdown menu for selecting subjects. This change simplifies the selection process, especially for common two-letter classes, making it easier for users to find and choose their subjects.",
        "links": "#",
        "live": "https://johnweatherford.github.io/project-delta/",
        "code": "#",
        "image": "images/project_delta.png"
    }
]

    const result = await collection.insertMany(starterData);
    res.status(200).json({ message: 'Projects populated successfully', insertedCount: result.insertedCount });
  } catch (error) {
    console.error('Error populating projects:', error);
    res.status(500).json({ error: 'Failed to populate projects' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
