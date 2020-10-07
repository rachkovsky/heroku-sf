const router = require('express').Router();
const jsforce = require('jsforce');

router.get('/', (req, res) => {
    if (req.cookies.instanceUrl)  {
        res.render('sfRestApi', {connection: req.cookies});
    } else {
        res.render('sfRestApi', {});
    }
});

router.get('/accounts', (req, res) => {

    let conn = new jsforce.Connection({
        instanceUrl : req.cookies.instanceUrl,
        accessToken : req.cookies.accessToken,
    });

    conn.query("SELECT Id, Name FROM Account", function(error, result) {
        if (error) {
            res.status(500).send(error.stack);
            return console.error(error); 
        }
        res.status(200).send({response: result.records});
      });
})

module.exports = router;