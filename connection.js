const sql = require('mssql')
const sqlConfig = {
  user: 'connWebServer',
  password: 'connWebServer',
  database: 'CIS525_StudentList',
  server: '141.215.69.65',
  options: {
    trustServerCertificate: true 
  }
}


async function getConnection(){
    try {
        console.log(sqlConfig, 'sqlConfig')

        let pool = await new sql.ConnectionPool(sqlConfig);
        let connect = await pool.connect();
        let request = await connect.request();
          return request;
       } catch (err) {
        // ... error checks
        console.log(err.message)
       }
}

module.exports = {
    getConnection
}