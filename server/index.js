const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const configDB = require('./config/database');

const { users, sections, companies } = require('./routes');

// DB Setup
mongoose.connect(configDB.database);

mongoose.connection.on('connected', () => console.log('Connected to database'));
mongoose.connection.on('error', () => console.log('Database error'));

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.use('/', users);

// Server Setup
const port = process.env.PORT || 3100;

app.listen(port, () => console.log('Server is running'));