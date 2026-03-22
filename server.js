const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cros=require('cros');
const bodyParser=require('bodyParser');

dotenv.config();

const app=express();
app.use(cros());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));