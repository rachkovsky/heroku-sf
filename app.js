const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;
const pg = require('pg');

const expressHbs = require('express-handlebars')
const hbs = require('hbs')

const connectionString = 'postgres://postgres:0057@localhost:5432/Todo_app';
const client = new pg.Client(connectionString);

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts',
      defaultLayout: 'index',
      extname: 'hbs'
    })
  )

app.set("view engine", "hbs");
app.use(express.static(__dirname + '/public'));

client.connect((err, res) => {
    //
});

client.query('SELECT * from users', (err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        console.log(res.rows)
    }
});

app.get('/', (req, res) => {
    client.query('SELECT * from users', (err, result) => {
        if (err) {
            res.render('error');
        }
        res.render('main', { users: result.rows });
    });
});

app.get('/user/:id', (req, res) => {
    client.query('SELECT * from list WHERE id = $1', [req.params.id], (err, result) => {
        if (err) {
            res.render('error');
        }
        res.render('main', { users: result.rows });
    });
    console.log(req.params.id);
    res.render('user');
});

app.listen(port, () => {
  console.log(`App listening at ${port}`)
});
