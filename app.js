if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
	require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
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
app.use(bodyParser.xml());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',              require('./routes/main'));
app.use('/herokuconnect', require('./routes/herokuConnect'));
app.use('/oauth',         require('./routes/oauth'));
app.use('/sfrestapi',     require('./routes/sfRestApi'));
app.use('/sfconnect',     require('./routes/sfConnect'));
app.use('/case',          require('./routes/outboundMessage'))

app.get('*', function (req, res) {
    res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`App listening at ${port}`)
});


module.exports = app;
