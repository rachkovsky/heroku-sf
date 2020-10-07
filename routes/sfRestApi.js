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
    console.log('----------- ', req.cookies.instanceUrl, req.cookies.accessToken  )

    conn.query("SELECT Id, Name FROM Contact", function(error, result) {
        if (err) {
            console.log('----------- 2 ', err);
            res.status(400).json({ error: error.stack});
            return console.error(err); 
        }
        console.log("total : " + result.totalSize);
        console.log("fetched : " + result.records.length);
        res.status(200).send({result: result});
      });
})

module.exports = router;