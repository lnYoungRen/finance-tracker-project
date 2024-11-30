const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
require('dotenv').config();
    
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 7777;

// middle ware 
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", usersRouter);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Connection error: ', error.message));



// start server
app.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`);
});
