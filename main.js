const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const nodeSass = require('node-sass-middleware');
const connectDB = require('./server/database/connection');

const path = require('path');

const app = express();
require('dotenv').config();

// *** Log requiest ***
// app.use(morgan('tiny'));

// *** SCSS ***
app.use(
  nodeSass({
    src: __dirname + '/scss',
    dest: __dirname + '/assets/css',
  })
);

// *** MongoDB connection ***
connectDB();
const PORT = process.env.PORT || 8080;

// *** adds the form to our body property of the request ***
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  next();
});

// *** Load assets ***
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));

// *** Load routers ***
app.use('/', require('./server/routes/loginRoute'));
app.use('/', require('./server/routes/productRoute'));
app.use('/', require('./server/routes/wishRoute'));
app.use('/', require('./server/routes/shoppingRoute'));

// *** Create Local Server ***
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
