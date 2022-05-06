const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");
const db = require('./src/models');
const port = process.env.PORT || 3000;


// Load Environment Variables
require('dotenv').config();

// Add middlewares
app.use(cors({origin: '*'}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../assets')));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'))

app.options('*', cors());

// Connecting to database
db.init();

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
})
// Add routes
app.use('/api/v1/users', require('./src/routes/user.route'));

app.listen(port, 'localhost', () => {
    console.log(`Quiz jam server listening at http://localhost:${port}`)
});
