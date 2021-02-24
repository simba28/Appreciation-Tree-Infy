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

app.get('/', (req, res) => res.send('API Running...'));

// Define routes
app.use('/posts', postsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
