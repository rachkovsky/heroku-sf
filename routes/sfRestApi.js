const router = require('express').Router();

router.get('/', (req, res) => {
    if (req.cookies.instanceUrl)  {
        res.render('sfRestApi', {connection: req.cookies});
    } else {
        res.render('sfRestApi', {});
    }
});

module.exports = router;