const express = require('express');
const path = require('path');
const app = require('./src/app');
const port = 3000;

//Middleware to parse JSOn-data
app.use(express.json());

//Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); 
});

//Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

//Define a simple GET-route to the root-URL
app.get('/', (req, res) => {
    res.sendFile('Hello, Express');
});

//Middleware for error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});