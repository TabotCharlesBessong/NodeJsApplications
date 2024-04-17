const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()
const port = process.env.PORT || 3500
const app = express()
const corsOptions = {
  origin:"https://localhost:8001"
}

// middleare
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(port,() => {
  console.log(`Our server is listening on port number ${port} ....`)
})