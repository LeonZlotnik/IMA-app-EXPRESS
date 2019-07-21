require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");
const User = require('./models/User');
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo') (session);

const Product = require('./models/Product');
const Purchase = require('./models/Purchase');


mongoose
  .connect(
    process.env.MONGODB, {
      useNewUrlParser: true
    }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));


app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

// Express View engine setup

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));  



// Passport Set Up
app.use(session({
  secret : "IMA2019",
  resave : true,
  saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());


//Passport Middleware
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.get('/perfil', (req, res) => {
  Product.find()
    .then(p => {
      Purchase.find()
        .then(purchase => {
          var q = purchase.map((e, i) => {
            return e.purchaseProductQuantity;
          });
          res.render('perfil', {
            p
          });
        })
    })
    .catch(err => {
      console.log(err);
    })
})

const index = require('./routes/index');
app.use('/', index);

const productos = require('./routes/productRouter');
app.use('/', productos);

const ventas = require('./routes/salesRouter');
app.use('/', ventas);

const usuarios = require('./routes/userRouter');
app.use('/', usuarios);

const compras = require('./routes/purchaseRouter');
app.use('/', compras);

// app.listen(3000);

module.exports = app;