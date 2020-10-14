const router = require('express').Router();
const client = require('../db');

router.get('/users', (req, res) => {
    client.query('SELECT * from todouser', (err, result) => {
        if (err) {
            res.render('error');
        }
        res.render('sfconnect', { users: result.rows || [] });
    });
});

router.get('/users/:id', async (req, res) => {

    try {
        const users = await client.query('SELECT * from todouser WHERE id = $1', [req.params.id]);

        if (users.rows.length > 0) {
            const todos = await client.query('SELECT * from todolist WHERE user_id = $1', [users.rows[0].id]);
            console.log('Postgress data: ', todos);
            res.render('sfconnect-user', { todos:  todos.rows, id: req.params.id })
        } else {
            res.render('sfconnect-user', { not_found: true, id: req.params.id })
        }
    } catch(err) {
        console.log(err);
        res.render('error');
    }
});

router.post('/addtodo', (req, res) => {
    if (req.body.content.length && req.body.content.length > 0) {
        client.query('INSERT INTO todolist (title, completed, user_id) VALUES ($1, $2, $3)', [req.body.content, false, req.body.id ], (err, result) => {
            if (err) {
                res.status(500).send({error: err})
            }
            res.status(200).send(result);
        });
    } else {
        res.status(400).send({error: "Input can't be empty"});
    }
})

module.exports = router;