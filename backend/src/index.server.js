const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//routes
const authRoutes = require('./routes/auth');

//environment variable
env.config();

//MongoDB connection 
//mongodb+srv://root:<password>@cluster0.f8kix.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.f8kix.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database connected !');
});

app.use(bodyParser());
app.use('/api', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});