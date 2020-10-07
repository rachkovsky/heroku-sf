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

    const conn = new jsforce.Connection({
        instanceUrl : req.cookies.instanceUrl || '',
        accessToken : req.cookies.accessToken || '',
    });

    conn.query("SELECT Id, Name FROM Account", function(error, result) {
        if (err) {
            res.render('error', { error: error.stack})
            return console.error(err); 
        }

        res.send(result);
        console.log("total : " + result.totalSize);
        console.log("fetched : " + result.records.length);
      });
})

module.exports = router;