const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhinaithani2:mB36Z2xgZnoYHiMU@vampire.8dtzv2g.mongodb.net/todo-app');

const userSchema = new mongoose.Schema({
    email : String,
    username : String,
    password : String,
    todoList : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Todos'
    }]
});

const todoSchema = new mongoose.Schema(
    {
    title: String,
    description: String,
    date: {
        type : Date,
        default: Date.now()
    },
    isCompleted: Boolean,
    isImportant: Boolean,    
    },
    {timestamps: true}
);

const User = mongoose.model('User',userSchema);
const Todos = mongoose.model('Todos',todoSchema);

module.exports = {
    User,
    Todos,
};
