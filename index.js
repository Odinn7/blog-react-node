import express from 'express';
import mongoose from "mongoose";
import multer from 'multer'
import {
  login, update, create, getMe, register, getOne, remove, getALl
} from './controlles/index.js'
import {
  loginValidation, postCreateValidation, registerValidation
} from './validations/validations.js';
import { handleValidationErrors, checkAuth} from './utils/index.js'


mongoose.connect(
  'mongodb+srv://admin:admin@blogcluster.cm92twd.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => {
  console.log('DB is OK')
}).catch(err => console.log('Error', err))

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("uploads", express.static("uploads"))

app.get('/', (req, res) => {
  res.send('Hello NOde ')
})

app.post("/auth/register", registerValidation, handleValifationErrors,
  register);
app.post("/auth/login", loginValidation, handleValifationErrors, login);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
});

app.post("/posts", checkAuth, postCreateValidation, create);
app.get("/posts", getALl);
app.get("/posts/:id", getOne);
app.delete("/posts/:id", checkAuth, remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, handleValifationErrors,
  update);

app.listen(4444, err => {
  if(err) {
    return console.log(err, 'error')
  }
  console.log('Server is Ok ')
});