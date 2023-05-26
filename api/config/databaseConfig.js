var mysql = require('mysql');

config = {
   host: '167.235.5.209',
   user: 'dirs21_example',
   password: 'gRtLLfnDPseW7-kJ',
   database: 'dirs21_example'
}
var connection =mysql.createConnection(config); //added the line
connection.connect(function(err){
  if (err){
    console.log('error connecting:' + err.stack);
  }
  console.log('connected successfully to DB.');
});

module.exports ={
     connection : mysql.createConnection(config) 
} 