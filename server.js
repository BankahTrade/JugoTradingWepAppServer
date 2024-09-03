require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const cors = require('cors');

// Creating Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://jugotrading.netlify.app', 'http://localhost:3000'],
  }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/user', userRoutes);

const port = process.env.PORT || 4000;

// Connection to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listening for request
        app.listen(port, () => {
            console.log(`Server running on port ${port} & MongoDB conected!!`);
        })
    })
    .catch((error) => {
        console.log(error);
    })
