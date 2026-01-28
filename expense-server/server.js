require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const groupRoutes = require('./src/routes/groupRoutes');

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log(`MongoDB connected!`))
    .catch((err)=>console.log(`MongoDB connection failed: ${err}`))

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/group', groupRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});