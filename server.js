import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.send("Hello from Express!");
});

app.get('/about', (req,res) => {
    res.send("About page");
});

app.get('/api/status', (req,res) => {
    res.json({ status : 'ok', message: "Server is running" });
});

app.get('/users/:id', (req,res) => {
    const userId = req.params.id;
    res.json({ message : `You requsted user ${userId}` });
});

app.get('/notes/:id', (req,res) => {
    const noteId = parseInt(req.params.id);
    res.json({ message : `You requsted note ${noteId}` });
});

app.get('/search', (req, res) => {
   const keyword = req.query.q;
   const limit = req.query.limit || 10;
   res.json({ searching: keyword, limit: limit });
});

app.use((req,res) => {
    res.status(404).json({ error: 'Route not found' });
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});