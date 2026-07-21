import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS and body parsing
app.use(cors());
app.use(express.json());

// Paths to JSON files
const portfolioPath = path.join(__dirname, 'server', 'data', 'portfolio.json');
const messagesDir = path.join(__dirname, 'server', 'data');
const messagesPath = path.join(messagesDir, 'messages.json');

// Ensure data directory exists
if (!fs.existsSync(messagesDir)) {
  fs.mkdirSync(messagesDir, { recursive: true });
}

// 1. GET /api/portfolio
app.get('/api/portfolio', (req, res) => {
  try {
    if (!fs.existsSync(portfolioPath)) {
      return res.status(404).json({ error: 'Portfolio data file not found' });
    }
    const data = fs.readFileSync(portfolioPath, 'utf8');
    return res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return res.status(500).json({ error: 'Failed to retrieve portfolio data' });
  }
});

// 2. POST /api/contact
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Read current messages
    let messages = [];
    if (fs.existsSync(messagesPath)) {
      try {
        const fileContent = fs.readFileSync(messagesPath, 'utf8');
        messages = JSON.parse(fileContent);
      } catch (parseError) {
        console.error('Error parsing messages.json, resetting file.', parseError);
      }
    }

    // Append new message
    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };

    messages.push(newMessage);

    // Save back to file
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2), 'utf8');

    return res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ error: 'Failed to process contact message' });
  }
});

// 3. Serve static React files in production
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Backend Server is running. Frontend has not been built yet (run npm run build).');
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
