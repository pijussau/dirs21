const faker = require('@faker-js/faker');
var db = require('../../config/databaseConfig.js');
const uuid = require("uuidv4");

// Generate 100 random dishes

var connection = db.connection

for (let i = 0; i < 100; i++) {
  const name = faker.vehicle.bicycle()
  const myuuid = uuid();
  const description = faker.vehicle.model()
  const price = 12.50
  const category = faker.vehicle.color()
  const available = "Breakfast"
  const delivery = "Tomorrow"

  connection.query(
    'INSERT INTO `dishes` (`uuid`, `name`, `description`, `price`, `category`, `available`, `active`, `delivery`) VALUES (?,?,?,?,?,?,?,?);',
    [myuuid, name, description, price, category, available, 1, delivery],
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
  
      // If you execute same statement again, it will be picked from a LRU cache
      // which will save query preparation time and give better performance
    })

}

connection.end()