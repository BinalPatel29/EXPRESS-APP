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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});