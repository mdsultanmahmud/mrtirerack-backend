const express = require('express')
const app = express()
require("dotenv").config()
const cors = require("cors")
const { connectToServer } = require('./utils/dbConnect')
const errorHandler = require('./middleware/errorHandler')
const port = process.env.PORT || 5000
const BestTireRoutes = require("./routes/v1/best_tire.routes") 
const CommentRoutes = require("./routes/v1/comments.routes")
const LearnHowToBlog = require("./routes/v1/learn_how.routes")
//middlewear 
app.use(cors())
app.use(express.json())

// connected to the database 
connectToServer((err) => {
    if (!err) {
        console.log("db connected")
    } else {
        console.log(err)
    }
})

//use the routes 
app.use('/api/v1/best_tire', BestTireRoutes)
app.use("/api/v1/comments", CommentRoutes)
app.use("/api/v1/learn_how", LearnHowToBlog)

app.get('/', (req, res) => {
    res.send('server is running successfully!!')
})


app.listen(port, () => {
    console.log(`Server is running from port: ${port}`)
})

// if user enter unknow routes 
app.all("*", (req, res) => {
    res.send("No routes found..")
})

// global error handler
app.use(errorHandler)
