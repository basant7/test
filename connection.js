const sql = require('mysql');

const  db = sql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@123",
    database:"task"
})

db.connect((error)=>{
    if(error){
        console.log(error)
    }
    console.log("Database connected")
});

module.exports = db;