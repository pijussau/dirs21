// import { faker } from "@faker-js/faker"
// const { db } = require("./db");
import { db } from './db.js';

// Generate 100 random dishes

for (let i = 0; i < 100; i++) {
  const name = faker.vehicle.bicycle()
  const myuuid = "123"
  const description = faker.vehicle.model()
  const price = 12.50
  const category = faker.vehicle.color()
  const available = "Breakfast"
  const delivery = "Tomorrow"

  db.query(
    'INSERT INTO `dishes` (`uuid`, `name`, `description`, `price`, `category`, `available`, `active`, `delivery`) VALUES (?,?,?,?,?,?,?,?)',
    [myuuid, name, description, price, category, available, 1, delivery],
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
  
      // If you execute same statement again, it will be picked from a LRU cache
      // which will save query preparation time and give better performance
    })

}

db.end();


























const express = require("express");

const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors")
const app = express();
const port = 9000;
const { uuid } = require("uuidv4");
// setup middleware
app.use(bodyParser.json());
app.use(cors());



//
var _dishes = [];


// clear dishes
router.get('/dishes/clear', (req, res) => {
    _dishes = [];
    
    res.json({
        status: "OK"
    });
});

// get dish by id
router.get('/dishes/:_id', (req, res) => {
    const dish = _dishes.find(x => x._id === req.params._id);

    res.json({
        status: "OK",
        data: dish ? dish : null
    });
});

// insert/update dish
router.put('/dishes', (req, res) => {
    if (req.body == null) {
        res.json({
            status: "Failed",
            message: "No content provided"
        });
    }
    else {
        let dish = req.body,
            status = "OK";
        
        if (!dish._id) {
            //
            dish._id = uuid();
            dish._Created = new Date();
            dish._Changed = null;

            //
            _dishes.push(dish);
        }
        else {
            //
            const dishIndex = _dishes.findIndex(x => x._id === dish._id);

            //
            if (dishIndex >= 0) {
                //
                dish._Changed = new Date();

                //
                _dishes[dishIndex] = dish;
            }
            else {
                //
                status = `dish not found for _id ${dish._id}`;
            }
        }

        res.json({
            status: status,
            data: dish
        });
    }
});

// delete dish
router.delete('/dishes/:_id', (req, res) => {
    let dishIndex = _dishes.findIndex(x => x._id === req.params._id);

    if (dishIndex !== -1) {
        _dishes.splice(dishIndex, 1);
    }

    res.json({
        status: "OK",
        message: dishIndex !== -1 ? "Dish deleted" : "Dish not found"
    });
});


//
app.use(router);

//
app.listen(port, () => {
    console.log(`api is ready on http://localhost:${port}`)
});