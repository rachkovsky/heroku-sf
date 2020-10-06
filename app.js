const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

const port = process.env.PORT || 3000;
const { Client } = require('pg');

const expressHbs = require('express-handlebars');
const hbs = require('hbs');
const jsforce = require('jsforce');

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:0057@localhost:5432/todo_app';
const client = new Client(connectionString);

const oauth2 = new jsforce.OAuth2({
    loginUrl: 'https://login.salesforce.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: '',
});

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

client.connect((err, res) => {
    if (!err) {
        client.query('SELECT * from todouser', (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows)
            }
        });
    }
});



app.get('/', (req, res) => {
    client.query('SELECT * from todouser', (err, result) => {
        if (err) {
            res.render('error');
        }
        res.render('main', { users: result.rows });
    });
});

app.get('/restapi', (req, res) => {
    if (req.cookies.instanceUrl)  {
        res.render('restApi', {connection: req.cookies});
    } else {
        res.render('restApi', {});
    }
});

app.get('/user/:id', async (req, res) => {

    try {
        const users = await client.query('SELECT * from todouser WHERE id = $1', [req.params.id]);

        if (users.rows.length > 0) {
            const todos = await client.query('SELECT * from todolist WHERE user_id = $1', [users.rows[0].id]);
            res.render('user', { todos:  todos.rows })
        } else {
            res.render('user', { not_found: true })
        }
    } catch(err) {
        console.log(err);
        res.render('error');
    }
});

app.get('/oauth', function (request, response) {
    oauth2.redirectUri = `https://${request.get('host')}/oauth/callback`
    response.redirect(oauth2.getAuthorizationUrl({}));
});

app.get('/oauth/callback', function (req, res) {
    const conn = new jsforce.Connection({ oauth2: oauth2 });

    conn.authorize(req.query.code, function (err, userInfo) {
        if (err) {
            res.render('error');
            return;
        }
        console.log('USER INFO', userInfo);
        console.log('CONN ', conn);
        const expiryDate = new Date(Number(new Date()) + 900000);
        res.cookie('accessToken', conn.accessToken, { expires: expiryDate, httpOnly: true });
        res.cookie('instanceUrl', conn.instanceUrl, { expires: expiryDate, httpOnly: true });
        res.cookie('userId', conn.accessToken, { expires: expiryDate, httpOnly: true });
        res.cookie('orgId', conn.instanceUrl, { expires: expiryDate, httpOnly: true });
        res.redirect('/restapi');

    });
});




app.listen(port, () => {
  console.log(`App listening at ${port}`)
});
