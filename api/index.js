import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(express.json());

const portfolioPath = path.join(process.cwd(), 'server', 'data', 'portfolio.json');
const messagesPath = path.join(process.cwd(), 'server', 'data', 'messages.json');

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

    let messages = [];
    if (fs.existsSync(messagesPath)) {
      try {
        const fileContent = fs.readFileSync(messagesPath, 'utf8');
        messages = JSON.parse(fileContent);
      } catch (parseError) {
        console.error('Error parsing messages.json:', parseError);
      }
    }

    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };

    messages.push(newMessage);

    try {
      const dir = path.dirname(messagesPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2), 'utf8');
    } catch (writeError) {
      console.warn('Unable to write to file system (normal in serverless environments):', writeError.message);
      // Fallback logging in serverless environment logs
      console.log('Received Message:', newMessage);
    }

    return res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ error: 'Failed to process contact message' });
  }
});

export default app;
