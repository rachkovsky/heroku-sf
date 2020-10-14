const router = require('express').Router();
const client = require('../db');

router.get('/users', (req, res) => {
    client.query('SELECT * from todouser', (err, result) => {
        if (err) {
            res.render('error');
        }
        res.render('sfconnect', { users: result.rows });
    });
});

router.get('/users/:id', async (req, res) => {

    try {
        const users = await client.query('SELECT * from todouser WHERE id = $1', [req.params.id]);

        if (users.rows.length > 0) {
            const todos = await client.query('SELECT * from todolist WHERE user_id = $1', [users.rows[0].id]);
            console.log('Postgress data: ', todos);
            res.render('sfconnect-user', { todos:  todos.rows })
        } else {
            res.render('sfconnect-user', { not_found: true })
        }
    } catch(err) {
        console.log(err);
        res.render('error');
    }
});

module.exports = router;