const express = require('express');
 
const app =express();
const cors =require('cors');

const database ={
    users:[
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'Asdfgh123',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }

    ]
}

//app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send(database.users);
});

app.post('/signin',(req,res)=>{
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success')
    }
    else{
        res.status(404).json('error logging in');
    }
    
});

app.post('/register',(req,res)=>{
    const{email, name, password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
    
});
app.get('/profile/:id',(req,res)=>{
    const{id} = req.params;
    const found  =false;
    database.users.forEach(user =>{
        if(user.id===id){
       return  res.json(user);
        }     
    })
if(!found){
    res.status(400).json('not found');
}
    
    
});





app.listen(3000);
