import express from "express"
import mysql from "mysql2/promise"
const app = express()
const con = await mysql.createConnection(
    { host: 'database-1.cgwyryygq3ih.ap-northeast-1.rds.amazonaws.com', database: 'assignment', user: 'admin', password : "",port:3306}
);
app.use(express.json())
var port = 3000
const charandnumber = /\W/
const mouse = /@/
const Uppercase = /[A-Z]/
const Lowercase = /[a-z]/
const number = /\d/
const special = "~`! @#$%^&*()_-+={[}]|:;\'\"<,>.?/|"
app.get('/healthcheck',(req,res)=>{
    res.send("Hello world !\n")
})
// app.get('/test',async (req,res)=>{
//     const result = await con.execute('SELECT * FROM user')
//     console.log(result._rows)
// })
app.post('/users',async (req,res)=>{
    const {name,email,password} = req.body
    try{
        if(await check(name,email,password,res) == 1){
            res.status(200)
            const date = req.header('Request-Date')
            await con.execute("INSERT INTO user (name, email, password) VALUES (?,?,?);",[name,email,password])
            var result = await con.execute('SELECT * FROM user WHERE email = ?;',[email])
            result = result[0][0]
            const user = {id: result.id,name,email}
            res.send({user,date})
            console.log("Signup success")
        }
    }catch(e){
        res.status(400)
        console.log(e.message)
        res.send({error:e.message})
    }
})
app.get('/users',async (req,res)=>{
    try{
        const{id} = req.query
        const date = req.header('Request-Date')
        var result = await con.execute('SELECT user.id, user.name, user.email FROM user WHERE id = ?;',[id])
        if(result[0].length == 1){
            var user = result[0][0]
            res.status(200)
            res.send({user,date})
            console.log("Query success")
        }
        else{
            res.status(403)
            res.send({error:"User not found"})
        }
    }catch(e){
        res.status(400)
        res.send({error:e.message})
    }
})
app.listen(port,()=>{console.log(`Server is on ${port}`)})
const check = async(Name,email,password,res)=>{
    try{
        if(charandnumber.test(Name)){
            res.status(400)
            res.send({error:'Name can only contain english alphabet and number'})
            return 0
        }
        if(!mouse.test(email)){
            res.status(400)
            res.send({error:'Please check your form email'})
            return 0
        }
        var results = await con.execute("SELECT * FROM user WHERE email = ?",[email])
        if(results[0].length > 0){
            res.status(403)
            res.send({error:'Email exists. Please enter new email!'})
            return 0
        }
        var count = 0
        if(Uppercase.test(password))
            count +=1
        if(Lowercase.test(password))
            count +=1
        if(number.test(password))
            count +=1
        var length = password.length
        for(var i = 0;i < length;i++){
            if(special.indexOf(password[i])>=0)
                count+=1
                break
        }
        if(count < 3){
            res.status(400)
            res.send({error:'Password format incorrect!'})
            return 0
        }
        return 1
    }catch(e){
        res.status(400)
        res.send({error:e.message})
        return 0
    }
}
