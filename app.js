const express = require('express');
const dotenv = require("dotenv").config({ path: "config/.env" });

const taskRouter = require('./Routes/taskRoute');
const userRouter = require('./Routes/userRoutes');

const connectDB = require('./database');

const globalErrorHandler = require('./controller/errorController');


const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1",taskRouter);
app.use("/api/v1",userRouter);

app.use(globalErrorHandler);

app.listen(4000,()=>{console.log(`server is running`)});

module.exports = app;