var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require("express-session"); 
var MongoStore = require("connect-mongo")(session); 

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'jade'); 

// APIs 

var mongoose = require("mongoose"); 
mongoose.connect("mongodb://localhost:27017/bookshop");


var db = mongoose.connection; 
db.on("error", console.error.bind(console, "# MongoDB - Connection Error: "));
// setup sessions 

app.use(session({
  secret: "robots",
  saveUninitialized: false, 
  resave: false,
  store: new MongoStore({mongooseConnection: db, ttl: 2*24*60*60 })
  // ttl ---> time to leave 2 days * 24 hrs * 60 min & 60 sec 
  // eCommerce 2-4 weeks 
}));
// save to session 

app.post("/cart", function(req,res){
  var cart = req.body; 
  req.session.cart = cart; 
  req.session.save(function(err){
    if(err){
      console.log("error saving to cart ", err); 
    }
    res.json(req.session.cart); 
  }); 
});

// get session cart api 

app.get("/cart", function(req,res){
  if(typeof req.session.cart !== "undefined"){
    res.json(req.session.cart); 
  }
})

// end of sessions 

var Books = require("./models/books.js"); 

//--->>> POST BOOKS <<<-----// 

app.post("/books", function(req,res){
  var book = req.body; 

  Books.create(book, function(err, books){
    if(err){
      console.log("error posting to books ", err); 
    }
    res.json(books); 
  });
});

app.get("/books", function(req,res){
  Books.find(function(err, books){
    if(err){
      console.log("error getting books ", err); 
    }
    res.json(books); 
  });
});

app.delete("/books/:_id", function(req,res){
  var query = {_id: req.params._id}; 

  Books.remove(query, function(err, books){
    if(err){
      console.log("error deleting book ", err); 
    }
    res.json(books);  
  });
});

app.put("/books/:_id", function(req,res){
    var book = req.body; 
    var query = req.params._id;

    var update = {
      "$set": {
        title: book.title, 
        description: book.description, 
        image: book.image, 
        price: book.price
      }
    }

    var options = {new : true}; 

    Books.findOneAndUpdate(query, update, options, function(err , books){
      if(err){
        console.log("error finding book ", err); 
      }
      res.json(books); 
    });
});

// get books images 

app.get("/images", function(req,res){
  const imgFolder = __dirname + "/public/images/";
  const fs = require("fs"); 

  fs.readdir(imgFolder, function(err,files){
    if(err){
      return console.log(err)
    }else{
      const filesArr = []; 
      files.forEach(function(file){
        filesArr.push({name: file}); 
      });
      res.json(filesArr);
    }
  });
});

app.listen(3001, function(err){
  if(err){
    return console.log(err); 
  }
  console.log("API Server Running on 3001");
});

//End APIs 

