const router = require('express').Router();
const client = require('../db');

router.get('/', (req, res) => {

    client.query('SELECT * from salesforce.account', (err, result) => {
        if (err) {
            console.log(err.stack);
            res.render('herokuConnect', {error: err.stack});
        } else {
            console.log(result.rows);
            res.render('herokuConnect', { records: result.rows });
        }
    });
})

module.exports = router;