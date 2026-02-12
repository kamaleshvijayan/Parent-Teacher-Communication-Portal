const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;
const DATA_FILE = path.join(__dirname, 'data', 'messages.json');

app.use(cors());
app.use(express.json());

// Helper to read data
async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

// Helper to write data
async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET /api/messages - Retrieve all messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await readData();
        // Sort by timestamp descending
        messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/messages - Create a new message
app.post('/api/messages', async (req, res) => {
    try {
        const messages = await readData();
        const newMessage = {
            id: Date.now().toString(), // Simple ID generation
            timestamp: new Date().toISOString(),
            read: false,
            ...req.body
        };

        messages.push(newMessage);
        await writeData(messages);

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH /api/messages/:id/read - Mark a message as read
app.patch('/api/messages/:id/read', async (req, res) => {
    try {
        const messages = await readData();
        const messageIndex = messages.findIndex(m => m.id === req.params.id);

        if (messageIndex === -1) {
            return res.status(404).json({ message: 'Message not found' });
        }

        messages[messageIndex].read = true;
        await writeData(messages);

        res.json(messages[messageIndex]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH /api/messages/:id - Update message content
app.patch('/api/messages/:id', async (req, res) => {
    try {
        const messages = await readData();
        const messageIndex = messages.findIndex(m => m.id === req.params.id);

        if (messageIndex === -1) {
            return res.status(404).json({ message: 'Message not found' });
        }

        if (req.body.subject) messages[messageIndex].subject = req.body.subject;
        if (req.body.content) messages[messageIndex].content = req.body.content;

        await writeData(messages);

        res.json(messages[messageIndex]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
