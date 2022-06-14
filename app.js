const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const http = require('http').createServer(app);
const formidable = require('express-formidable');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));
app.use("/public", express.static(__dirname + '/public'));
app.use(formidable());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

const pool = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'alazanidb'
});

http.listen(3000,function(){
  console.log('listening on *:3000');

  app.get('/', (req, res) => {
    pool.getConnection((err,connection) => {
      if(err) console.log(err);
      connection.query('SELECT id,name,description,price,image,category FROM `product` WHERE 1 ', (err, rows) => {
      connection.release();
      if(err) {
        console.log(err);
      }
      else{
       res.render('index',{
        rows: rows 
       });
      }   
      })
    });
  });

  app.get('/cart', (req, res) => {
    res.render('cart');
  })

  app.get('/:sort', (req, res) => {
    const sort = req.params.sort;
    pool.getConnection((err,connection) => {
      if(err) console.log(err);
      var query;
      switch(sort){
        case 'priceascending':
          query = 'SELECT id,name,description,price,image FROM `product` ORDER BY price ASC';
          break;
        case 'pricedescending':
          query = 'SELECT id,name,description,price,image FROM `product` ORDER BY price DESC';
          break;
        case 'priceaz':
          query = 'SELECT id,name,description,price,image FROM `product` ORDER BY name ASC';
          break;
        default:
          query = 'SELECT id,name,description,price,image FROM `product` WHERE 1';
          break;
      }
      connection.query(query, (err, rows) => {
      connection.release();
      if(err) {
        console.log(err);
      }
      else{
       res.render('index',{
        rows: rows 
       });
      }   
      })
    });
  });

  app.get('/productPage/:id', (req, res) => {
    const id = req.params.id;
    pool.getConnection((err,connection) => {
      if(err) console.log(err);
      connection.query('SELECT * FROM `product` WHERE product.id = ? ; ',[id], (err, rows) => {
      connection.release();
      if(err) {
        console.log(err);
      }
      else{
        res.render('productPage',{rows: rows});
      }   
      })
    });
  });

  app.get('/entry/signup', (req,res) => {
      res.render('./entry/signup');
  })

  app.get('/entry/signin', (req,res) => {
    res.render('./entry/signin');
  })

  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });


})
