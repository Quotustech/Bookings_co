const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose')
const port = process.env.PORT
const db = process.env.DATABASE_URL
const router = require('./routes/route')
const cors = require('cors'); //
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect(db).then(()=>{
    console.log("Database connected")
  }).catch((error)=>
    console.log("no connection",error)
  );

app.use(bodyParser.json());
app.use(cors());
app.use(router);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });