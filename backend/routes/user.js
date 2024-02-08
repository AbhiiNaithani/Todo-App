const {Router} = require('express');
const userAuth = require('../middlewares/userAuth');
const todoInput = require('../middlewares/todoInput');
const { Todos, User } = require('../db');
const jwt = require('jsonwebtoken');

const router = Router();

const userMiddlewares = [userAuth, todoInput];

//To add new todo
router.post('/addTodo',...userMiddlewares, async (req, res) => {
    const {title, description, date, isCompleted, isImportant} = req.body;
    const todo = await Todos.create({
        title,
        description,
        date,
        isCompleted,
        isImportant
    });
    const token = req.headers.authorization;
    const words = token.split(' ');
    const actualToken = words[1];
    const decoded = jwt.decode(actualToken);

    await User.findOneAndUpdate({
        email: decoded.email,
    },{
        "$push": {
            todoList: todo._id,
        }
    })
    res.json({
        message: 'Todo added successfully'
    })
});

//to edit the todo by id
router.put('/editTodo/:id',...userMiddlewares, async (req, res) => {
    const id = req.params.id;
    const {title, description, date, isCompleted, isImportant} = req.body;

    await Todos.findByIdAndUpdate(id,{
        title,
        description,
        date,
        isCompleted,
        isImportant
    });
    
    res.json({
        message: 'Todo edited successfully'
    })
});

//to delete a todo by id
router.put('/deleteTodo/:id',userAuth, async (req, res) => {
    const id = req.params.id;

    await Todos.findByIdAndDelete(id);

    const token = req.headers.authorization;
    const words = token.split(' ');
    const actualToken = words[1];
    const decoded = jwt.decode(actualToken);

    await User.findOneAndUpdate({
        email: decoded.email,
    },{
        "$pull": {
            todoList: id,
        }
    });
    
    res.json({
        message: 'Todo deleted successfully'
    })
});

//to get all todos
router.get('/allTodos', userAuth, async (req, res) => {
    const token = req.headers.authorization;
    const words = token.split(' ');
    const actualToken = words[1];
    const decoded = jwt.decode(actualToken);

    const user = await User.findOne({
        email: decoded.email,
    });

    const todos = await Todos.find({
        _id: {
            "$in": user.todoList,
        }
    })
    
    res.json({
        todos: todos,
    })
})

//to get important todos list
router.get('/importantTodos', userAuth, async (req, res) => {
    const token = req.headers.authorization;
    const words = token.split(' ');
    const actualToken = words[1];
    const decoded = jwt.decode(actualToken);

    const user = await User.findOne({
        email: decoded.email,
    });

    const todos = await Todos.find({
        _id: {
            "$in": user.todoList,
        },
        isImportant: true,
    })
    
    res.json({
        todos: todos,
    })
})

//to get completed todos list
router.get('/completedTodos', userAuth, async (req, res) => {
    const token = req.headers.authorization;
    const words = token.split(' ');
    const actualToken = words[1];
    const decoded = jwt.decode(actualToken);

    const user = await User.findOne({
        email: decoded.email,
    });

    const todos = await Todos.find({
        _id: {
            "$in": user.todoList,
        },
        isCompleted: true,
    })
    
    res.json({
        todos: todos,
    })
})

// to get incomplete todos list
router.get('/incompleteTodos', userAuth, async (req, res) => {
    const token = req.headers.authorization;
    const words = token.split(' ');
    const actualToken = words[1];
    const decoded = jwt.decode(actualToken);

    const user = await User.findOne({
        email: decoded.email,
    });

    const todos = await Todos.find({
        _id: {
            "$in": user.todoList,
        },
        isCompleted: false,
    })
    
    res.json({
        todos: todos,
    })
})

module.exports = router;