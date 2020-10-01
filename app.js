const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;
const { Client } = require('pg');

const expressHbs = require('express-handlebars')
const hbs = require('hbs')

const connectionString = 'postgres://postgres:0057@localhost:5432/Todo_app';
const client = new Client(connectionString);

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts',
      defaultLayout: 'index',
      extname: 'hbs'
    })
  )

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/user/:id', async (req, res) => {

    try {
        const lists = await client.query('SELECT * from list WHERE user_id = $1', [req.params.id]);

        if (lists.rows.length > 0) {
            const todos = await client.query('SELECT * from list_item WHERE list_id = $1', [lists.rows[0].id]);
            res.render('user', { todos:  todos.rows })
        } else {
            res.render('user', { not_found: true })
        }
    } catch(err) {
        console.log(err);
        res.render('error');
    }
});

app.listen(port, () => {
  console.log(`App listening at ${port}`)
});
