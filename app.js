const fs = require('fs')
const mysql = require('mysql');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: 3306,
  database: 'newblog'
})


fs.readFile('./1.json', 'utf-8', (err, data) => {
  data = JSON.parse(data)
  let query = 'INSERT INTO article SET ?'
  var date = new Date()
  for(var i =0 ;i< data.length;i++){
    data[i].year = date.getFullYear(),
    data[i].mounth = date.getMonth() + 1,
    data[i].day = date.getDate() 
    delete data[i].url
    db.query(query, data[i], (err, data) => {
        if(!err) {console.log(1); return}
        console.log(err)
    })
  }
 
})



