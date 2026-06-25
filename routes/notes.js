import express from 'express';
import { readNotes, saveNotes } from '../storage.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const notes = await readNotes();
        res.json(notes);
    } catch (error) {
        next(error); 
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const notes = await readNotes();
        const note = notes.find(n => n.id === parseInt(req.params.id));
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'text is required' }); 

        const notes = await readNotes();
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
        
        const newNote = {
            id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
            text,
            createdAt: dateStr
        };
        
        notes.push(newNote);
        await saveNotes(notes);
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const notes = await readNotes();
        const filtered = notes.filter(n => n.id !== parseInt(req.params.id));
        
        if (filtered.length === notes.length) {
            return res.status(404).json({ error: 'Note not found' });
        }
        
        await saveNotes(filtered);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export default router;