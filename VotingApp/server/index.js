
const express = require('express')
const fs = require('fs').promises
const path = require('path')

const app  = express()
const dataFile = path.join(__dirname,"data.json")

app.listen(3000,()=>{
  console.log('server is running');
})

// support hoisting of  data

app.use(express.urlencoded({extended:true}))

app.get("/post",async(req,res)=>{
  let data = JSON.parse(await fs.readFile(dataFile, 'utf-8'))
  console.log(data);
  res.end()
  // res.send("Hello world")
})

// console.log('Hello');