import 'dotenv/config'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { MongoClient, ServerApiVersion } from 'mongodb'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Fix for __dirname with ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// MongoDB Connection
const uri = process.env.MONGO_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// ===============================
// ROUTES
// ===============================

// Home page
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'projects(1).html'))
})


// READ - Get all projects
app.get('/api/projects', async (req, res) => {

  try {

    const db = client.db('johnweatherford')
    const collection = db.collection('projects')

    const records = await collection.find({}).toArray()

    res.status(200).json(records)

  } catch (error) {

    console.error('Error reading projects:', error)
    res.status(500).json({ error: 'Failed to get projects' })

  }

})


// Populate database with starter projects
app.get('/api/populate-projects', async (req, res) => {

  try {

    const db = client.db('johnweatherford')
    const collection = db.collection('projects')

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
        "project": "https://unaedu-my.sharepoint.com/",
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
        "description": "A web form improvement project that enhances user experience by replacing a small textbox with a dynamic dropdown menu for selecting subjects.",
        "links": "#",
        "live": "https://johnweatherford.github.io/project-delta/",
        "code": "#",
        "image": "images/project_delta.png"
      }

    ]

    const result = await collection.insertMany(starterData)

    res.status(201).json({
      message: "Projects populated successfully",
      insertedCount: result.insertedCount
    })

  } catch (error) {

    console.error("Error populating projects:", error)

    res.status(500).json({
      error: "Failed to populate projects"
    })

  }

})


// ===============================
// START SERVER
// ===============================

async function startServer() {

  try {

    await client.connect()

    console.log("Connected to MongoDB")

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

  } catch (error) {

    console.error("MongoDB connection error:", error)

  }

}

startServer()
