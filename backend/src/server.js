const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");
const db = require('./models');
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
app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/users', require('./routes/user.route'));
app.use('/api/v1/friends', require('./routes/friend.route'));
app.use('/api/v1/categories', require('./routes/category.route'));
app.use('/api/v1/topics', require('./routes/topic.route'));
app.use('/api/v1/posts', require('./routes/post.route'));
app.use('/api/v1/comment', require('./routes/comment.route'));
app.use('/api/v1/question', require('./routes/question.route'));
app.use('/api/v1/file', require('./routes/file.route'));

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});

    return;
});

app.listen(port, 'localhost', () => {
    console.log(`Quiz jam server listening at http://localhost:${port}`)
});
