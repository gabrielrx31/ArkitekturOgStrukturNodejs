const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const homeRoutes = require('./routes/homeRoutes');
const submitRoutes = require('./routes/submitRoutes');

const app = express();

//Middleware
app.use(logger);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

//Routes
app.use('/', homeRoutes);
app.use('/', submitRoutes);

//404-middleware
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

//Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;