const express = require('express');
const mongoose = require('mongoose');

const app=express();
const port = 3001;

app.use(express.json());

mongoose.connect('mongodb+srv://rahul:rahul@cluster0.t0vqyti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log('Connected to MongoDB'))
.catch(err=> console.log('Error connectiong to mongoDB:',err));

const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.get('/users',(req,res)=>{
    User.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json({message: err.message}));
});

app.post('/users', (req, res) =>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password


    });

    user.save()
    .then(newUser => res.status(201).json(newUser))
    .catch(err=>res.status(400).json({message: err.message}));
});