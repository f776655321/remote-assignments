import express from "express"

const app = express()

var port = 3000
app.get('/healthcheck',(req,res)=>{
    res.send("Hello world !")
})
app.listen(port,()=>{console.log(`Server is on ${port}`)})
