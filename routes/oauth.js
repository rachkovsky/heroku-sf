const router = require('express').Router();
const jsforce = require('jsforce');

const oauth2 = new jsforce.OAuth2({
    loginUrl: 'https://login.salesforce.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});


router.get('/', function (request, response) {
    oauth2.redirectUri = `https://${request.get('host')}/oauth/callback`
    response.redirect(oauth2.getAuthorizationUrl({}));
});

router.get('/callback', function (request, response) {
    const conn = new jsforce.Connection({ oauth2: oauth2 });

    conn.authorize(request.query.code, function (err, userInfo) {
        if (err) {
            response.render('error');
            return;
        }
        console.log('USER INFO:', userInfo);
        console.log('CONNECTION: ', conn);

        const expiryDate = new Date(Number(new Date()) + 900000); // 15 min
        
        response.cookie('accessToken', conn.accessToken, { expires: expiryDate, httpOnly: true });
        response.cookie('instanceUrl', conn.instanceUrl, { expires: expiryDate, httpOnly: true });
        response.cookie('userId', userInfo.id, { expires: expiryDate, httpOnly: true });
        responses.cookie('orgId', userInfo.organizationId, { expires: expiryDate, httpOnly: true });
        response.redirect('/restapi');

    });
});

module.exports = router;