const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 1039;

const pool = mysql.createPool({
    host : 'localhost', 
    user : 'root',
    password : '',
    database : 'nodejs_lottery'
})

var obj1 = {}

app.set('view engine','ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false})) 

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/table',(req,res)=>{
    res.render('table')
})

app.get('/insert',(req,res)=>{
    res.render('insert')
})

app.get('/profile',(req,res)=>{
    res.render('profile')
})

app.get('/checkLott',(req,res)=>{
    res.render('checkLott')
})

app.get('/table1april',(req,res)=>{
    pool.getConnection((err, connection)=>{
            if(err) throw err
            console.log("connected id : ?",connection.threadId)
            connection.query('SELECT * FROM oneapril',(err,rows)=>{
                connection.release();
                if(err){
                    console.log(err)
                }else{

                    obj1 = { Error : err, oneapril : rows }

                    res.render('table1april',obj1)

                }
            })
    })
})

app.get('/table16march',(req,res)=>{
        pool.getConnection((err, connection)=>{
                if(err) throw err
                console.log("connected id : ?",connection.threadId)
                connection.query('SELECT * FROM onesixmarch',(err,rows)=>{
                    connection.release();
                    if(err){
                        console.log(err)
                    }else{

                        obj1 = { Error : err, onesixmarch : rows }

                        res.render('table16march',obj1)

                    }
                })
        })
})



app.get('/table16april',(req,res)=>{
    pool.getConnection((err, connection)=>{
            if(err) throw err
            console.log("connected id : ?",connection.threadId)
            connection.query('SELECT * FROM onesixapril',(err,rows)=>{
                connection.release();
                if(err){
                    console.log(err)
                }else{

                    obj1 = { Error : err, onesixapril: rows }

                    res.render('table16april',obj1)

                }
            })
    })
})

app.post('/insert',(req, res) => {
    pool.getConnection((err, connection) => { 
        if(err) throw err
            const par = req.body
                pool.getConnection((err, connection) => {
                    connection.query('INSERT INTO oneapril SET ?', par, (err, rows) => {
                        connection.release()
                        if(!err){
                            obj1 = {Error:err, mesg : `Adding Compleat`}
                            res.render('insert', obj1)
                        }else {
                             console.log(err)
                            }
                    })   
                })
    })
})   

app.get('/insert1april',(req,res)=>{
    res.render('insert1april')
})

app.get('/insert16april',(req,res)=>{
    res.render('insert16april')
})

app.post('/insert1april',(req, res) => {
    pool.getConnection((err, connection) => { 
        if(err) throw err
            const par = req.body
                pool.getConnection((err, connection) => {
                    connection.query('INSERT INTO onesixmarch SET ?', par, (err, rows) => {
                        connection.release()
                        if(!err){
                            obj1 = {Error:err, mesg : `Adding Compleat`}
                            res.render('insert1april', obj1)
                        }else {
                             console.log(err)
                            }
                    })   
                })
    })
})   

app.post('/insert16april',(req, res) => {
    pool.getConnection((err, connection) => { 
        if(err) throw err
            const par = req.body
                pool.getConnection((err, connection) => {
                    connection.query('INSERT INTO onesixapril SET ?', par, (err, rows) => {
                        connection.release()
                        if(!err){
                            obj1 = {Error:err, mesg : `Adding Compleat`}
                            res.render('insert16april', obj1)
                        }else {
                             console.log(err)
                            }
                    })   
                })
    })
})   


app.listen(port,() => console.log("Server Post :",port,"Is Running..."))