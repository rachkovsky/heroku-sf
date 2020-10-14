const router = require('express').Router();
const client = require('../db');

router.get('/', (req, res) => {

    client.query('SELECT * from salesforce.account', (err, result) => {
        if (err) {
            res.render('herokuConnect', {error: err.stack});
            return console.error(err);
        } 
        console.log('Heroku connect postgres: ', result.rows);
        res.render('herokuConnect', { records: result && result.rows ? result.rows : [] });
    });
})

module.exports = router;