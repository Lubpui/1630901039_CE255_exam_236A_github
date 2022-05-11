const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 1039;

const pool = mysql.createConnection({
    host : 'localhost', 
    user : 'root',
    password : '',
    database : 'nodejs_lottery'
})

app.set('view engine','ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false})) 

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/checkLott',(req,res)=>{
    res.render('checkLott')
})

app.listen(port,() => console.log("Server Post :",port,"Is Running..."))