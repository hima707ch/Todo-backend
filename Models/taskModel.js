const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true, "Please enter title"],
        maxlength : [50, "please write a short title"]
    },
    description :{
        type : String,
        required : [true, "Please enter description"],
    },
    status : {
        type : String,
        default : "todo"
    },
    dueDate : {
        type : Date,
        default : Date.now() + + 5 * 24 * 60 * 60 * 1000  // set 5 days deadline
    }
});

const Task = mongoose.model("Task",taskSchema);

module.exports = Task;