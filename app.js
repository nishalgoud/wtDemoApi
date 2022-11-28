const express = require('express')
const app = express()
const cors = require('cors');
const { getConnection } = require('./connection');
const bodyParser = require('body-parser')
require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}))

//crud

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/test', function (req, res) {
  res.send('testing application')
})

app.get('/api/usersList', async function (req, res) {

    const getConn = await getConnection();
    console.log(getConn, 'getconnection');
    const result = await getConn.query(
        "select * from Users"
      );
    res.send(result.recordsets[0])
  })

  
app.get('/api/usersList/:userId', async function (req, res) {


  try{
    const { userId } = req.params;
    const getConn = await getConnection();
    const result = await getConn.query(
        `select * from users where userId = ${userId}`
      );
      res.send(result.recordsets[0])
  }
  catch(err){
    console.log(err.message);
  }

})

app.delete('/api/deleteUser/:userId', async function (req, res) {


  try{
    const { userId } = req.params;
    const getConn = await getConnection();
    const result = await getConn.query(
        `delete from users where userId = ${userId}`
      );
      res.send('success')
  }
  catch(err){
    console.log(err.message);
  }

})

app.put('/api/updateUser', async function (req, res) {

  try{

  const { userId, userName, fullName } = req.body;
  console.log(req.body, 'body')
  const getConn = await getConnection();
  const result = await getConn.query(
      `UPDATE users
      SET userName = '${userName}', fullName= '${fullName}'
      WHERE userId = ${userId};`
    );


  res.send('success');
  }
  catch(err){
    console.log(err.message);
    res.send('')
  }
})


  app.post('/api/createUser', async function (req, res) {

    try{

    const { userName, fullName } = req.body;
    console.log(req.body, 'body')
    const getConn = await getConnection();
    const result = await getConn.query(
        `INSERT INTO Users
        VALUES ('${userName}','${fullName}' )`
      );

      console.log('success');
    res.send(result.recordsets[0])
    }
    catch(err){
      console.log(err.message);
      res.send('')
    }
  })

app.listen(process.env.PORT,()=>{
    console.log(`node is running on ${process.env.PORT}`)
})