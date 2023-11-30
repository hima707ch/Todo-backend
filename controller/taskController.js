const Task = require('../Models/taskModel');
const ApiFeatures = require('../utils/ApiFeatures');
const CustomError = require('../utils/customError');

const createTask = async (req,res,next)=>{
    try{
    const {title,description,status,dueDate} = req.body;

    const task = await Task.create({
        title,
        description,
        status,
        dueDate
    });

    res.status(201).json({
        success : true,
        message : "task created successfully",
        task
    })

    }
    catch(err){
        next(err);
    }
}

const getAllTasks = async (req,res,next)=>{
    try{
        console.log(req.query);

        const features = new ApiFeatures(Task.find(), req.query)
        .filter()
        .sort()
        .paginate();

        const tasks = await features.query;

        if(!tasks || (tasks && tasks.length === 0)){
            return next(new CustomError("No data Found", 200))
        }

        res.status(200).json({
            success : true,
            tasks
        });

    }
    catch(err){
        next(err);
    }

}

const getTask = async (req,res,next)=>{
    try{
        const id = req.params.id;

        const task = await Task.findById(id);

        if(!task){
            return next(new CustomError("No task Found", 200));
        }

        res.status(200).json({
            success : true,
            task
        })

    }
    catch(err){
        next(err);
    }
}

const updateTask = async(req,res,next)=>{

    try{

        const id = req.params.id;
    
        const {title,description,status,dueDate} = req.body;
    
        const data = {};
    
        if(title) data.title = title;
        if(description) data.description = description;
        if(status) data.status = status;
        if(dueDate) data.dueDate = dueDate;

        console.log("data",data);
    
        const task = await Task.findByIdAndUpdate(id, data, {
            new : true,
            runValidators : true,
            useFindAndModify :true
        });

        if(!task){
            return next(new CustomError("No task Found", 200));
        }
    
        res.status(200).json({
            success:true,
            task
        })
    }
    catch(err){
        next(err);
    }
}

const deleteTask = async (req,res,next)=>{

    try{
        const id = req.params.id;
    
        const resp = await Task.findByIdAndDelete(id);
    
        if(!resp){
            return next(new CustomError("No task Found", 200));
        }
    
        res.status(200).json({
            success : true,
            message : "Task deleted successfully"
        })
    }
    catch(err){
        next(err);
    }

}

module.exports = {createTask,getAllTasks,getTask,updateTask,deleteTask};