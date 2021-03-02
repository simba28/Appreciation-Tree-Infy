const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
var cors = require('cors')
const postsRoute = require('./routes/posts');

dotenv.config();
const app = express();
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.static('../frontend/build/'))
app.get('/', (req, res) => res.send('API Running...'));

// Define routes
app.use('/posts', postsRoute);
app.get('/*', (req,res) => {
    res.sendFile('index.html', {root: __dirname + '/../frontend/build/'});
});
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
