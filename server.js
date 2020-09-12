const express=require('express');
const bodyParser=require('body-parser');
const bcrypt =require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const image=require('./Controllers/image');
const register=require('./Controllers/register');
const profile=require('./Controllers/profile');
const signIn=require('./Controllers/signin');




const db = knex({
    client: 'pg',
    connection: {
        connectionString:process.env.DATABASE_URL,
        ssl:true,
    //   host : '127.0.0.1',
    //   user : 'postgres',
    //   password : 'postgres123',
    //   database : 'smart-brain'
    }
  });



const app=express();
app.use(bodyParser.json());
app.use(cors())

// const database={
//     users:[
//         {
//             id:"123",
//             name:"Dilip",
//             email:"dkt@gmail.com",
//             password:'nara',
//             entries:0,
//             joined:new Date()

//         },
//         {
//             id:"124",
//             name:"Krishna",
//             email:"krishna@gmail.com",
//             password:'pokhara',
//             entries:0,
//             joined:new Date()

//         }

//     ]

// }

// app.get('/',(req,res)=>{res.send(database.users)})
app.get('/',(req,res)=>{res.send('It is working!')})
// app.get('/',(req,res)=>{res.send(database.users)})

app.post('/signin',signIn.handleSignin(db,bcrypt))
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})  
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})




    
    //     let found=false;
    // database.users.forEach(user=>{
    //     if(user.id===id){
    //         found=true;
    //         user.entries++
    //         return res.json(user.entries);
    //     }
    // })
    // if(!found){
    //     res.status(400).json('img not found');
    // }

    // app.listen(3000,(req,res)=>{
    //     console.log("app is running on port 3000");
app.listen(process.env.PORT || 3000,()=>{
    console.log(`app is running on port ${process.env.PORT}`);
    
});