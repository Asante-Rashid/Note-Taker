const express = require('express');
const fs = require('fs');
//used to store and retrieve notes
const path = require('path');
const notesData = require('./db/db.js');


const app = express();
const PORT = process.env.PORT || 8080;

fs.readFile(path.join(__dirname, './public/notes.html'), 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(notesData)
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// HTML Routes

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(notesData));

// '*' operator needs to be last for whatever reason or else it overides all other links
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


//API Routes
//should receive a new note to save on the request body, add it to the `db.json` file, 
//and then return the new note to the client.
// You'll need to find a way to give each note a unique id when it's saved 
//(look into `npm` packages that could do this for you).
// app.post('/api/notes', (req, res) => {
//     notesData.push(req.body);
//     res.json(notesData);

// });

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});