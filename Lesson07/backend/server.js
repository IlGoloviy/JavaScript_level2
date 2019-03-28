const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(express.static('../frontend'));

app.get('/catalogData', (req, res) => {
  fs.readFile('../frontend/catalog.json', 'utf-8', (err, data) => {
    res.send(data);
  });
});

app.post('/addToCart', (req, res) => {
  fs.readFile('../frontend/cart.json', 'utf-8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
  
      cart.push(item);
  
      fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
        console.log('done');
      });
    }
  });
});

app.post('/deleteToCart', (req, res) => {
  fs.readFile('../frontend/cart.json', 'utf-8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
  
      cart.splice(item, 1);
  
      fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
        console.log('done');
      });
    }
  });
});

app.listen(3000, function() {
  console.log('server is running on port 3000');
});