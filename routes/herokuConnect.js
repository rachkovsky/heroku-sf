const router = require('express').Router();
const client = require('../db');

router.get('/', (req, res) => {

    client.query('SELECT * from salesforce.account', (err, result) => {
        if (err) {
            console.log(err.stack);
            res.render('error', {error: err.stack});
        } else {
            res.render('herokuConnect', { records: result.rows });
        }
    });
})

module.exports = router;