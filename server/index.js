const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRouter = require('./routes/user');
const progressRouter = require('./routes/progress');
const careerRouter = require("./routes/career");
const chatRouter = require('./routes/chatbot');


const app = express();

dotenv.config();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST','DELETE'],
    credentials: true,
}));


app.use(express.json());

const PORT = process.env.PORT || 5000;

const connectMongoDB = async () => {
    try {
        const MONGO_URI = process.env.MONGODB_URI;
        const connection = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};

connectMongoDB();

app.use('/api/user', userRouter);
app.use('/api/progress', progressRouter);
app.use('/api/career',careerRouter);
app.use('/api', chatRouter); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
