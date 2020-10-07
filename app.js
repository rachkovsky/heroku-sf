if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express();

const port = process.env.PORT || 3000;

const pgClient = require('./db');

pgClient.connect();

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts',
      defaultLayout: 'index',
      extname: 'hbs'
    })
  )

app.set("view engine", "hbs");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/loaderio-5bbb935b66b760e9322e450d144e3569', express.static(path.join(__dirname, 'loaderio-5bbb935b66b760e9322e450d144e3569.txt')));

app.use('/herokuconnect', require('./routes/herokuConnect'));
app.use('/oauth',         require('./routes/oauth'));
app.use('/sfrestapi',     require('./routes/sfRestApi'));
app.use('/sfconnect',     require('./routes/sfConnect'));

app.get('*', function (req, res) {
    res.status(404).render('404');
});


app.listen(port, () => {
  console.log(`App listening at ${port}`)
});
