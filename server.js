const express = require('express');
const path = require('path');
const notesData = require('./db/db.js');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML Routes

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => res.json(notesData));

//API Routes


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});