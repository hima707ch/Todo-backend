const CustomError = require('../utils/customError');
const mongoose = require('mongoose');

const globalErrorHandler = (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'Internal server error';

    // Mongo Invalid ID error
    if(error.name == "CastError"){
        const msg = `Cast Error : something Invalid, Invalid ${error.path} ${error}`;
        error = new CustomError(msg, 400);
    }

    if(error instanceof mongoose.Error.ValidationError){
        const msg = `Validation Error : Invalid data is entered`;
        error = new CustomError(msg, 400);
    }

    if(error.code === 11000){
        const msg = `Duplicate ${Object.keys(error.keyValue)}`
        error = new CustomError(msg, 409);
    }

    if(error.statusCode === 200){
        res.status(error.statusCode).json({
            success : true,
            message : error.message,
        });
        return;
    }

    console.log(error)

    res.status(error.statusCode).json({
        success : false,
        message : error.message,
    })
}

module.exports = globalErrorHandler;