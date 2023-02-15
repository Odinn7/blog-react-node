import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";


mongoose.connect(
  'mongodb+srv://admin:wwwwww@cluster0.6bbthav.mongodb.net/?retryWrites=true&w=majority'
).then(() => {
  console.log('DB is OK')
}).catch(err => console.log('Error', err))

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello NOde ')
})

app.post("/auth/login", (req, res) => {
  console.log(req.body)
  
  const token = jwt.sign({
    email: req.body.email,
    fullName: "John Smith"
  }, 'secret123');
  
  res.json({
    success: true,
    token
  })
});

app.listen(4444, err => {
  if(err) {
    return console.log(err, 'error')
  }
  
  console.log('Server is Ok ')
});