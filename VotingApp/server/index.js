
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

app.get("/poll",async(req,res)=>{
  let data = JSON.parse(await fs.readFile(dataFile, 'utf-8'))
  // console.log(data);
  const totalVotes  = Object.values(data).reduce((total,n) => total += n, 0 )
  // console.log(totalVotes);
  data = Object.entries(data).map(([label,votes])=>{
    return {
      label,
      percentage:(((100 * votes ) / totalVotes) || 0 ).toFixed(0)
    }
  })
  res.json(data)
  // res.send("Hello world")
})

app.post("/post", async (req,res)=>{
  const  data = JSON.parse(await fs.readFile(dataFile, 'utf-8'))
  data[req.body.add]++
  await fs.writeFile(dataFile,JSON.stringify(data))
  res.end()
})

// console.log('Hello');