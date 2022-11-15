const express = require('express')
const app = express()
const cors = require('cors');
const { getConnection } = require('./connection');
require('dotenv').config()

app.use(cors({
    origin: '*'
}))


app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/test', function (req, res) {
  res.send('testing application')
})

app.get('/usersList', async function (req, res) {

    const getConn = await getConnection();
    console.log(getConn, 'getconnection');
    const result = await getConn.query(
        "select * from tblStudent_List"
      );
    res.send(result.recordsets[0])
  })


app.listen(process.env.PORT,()=>{
    console.log(`node is running on ${process.env.PORT}`)
})