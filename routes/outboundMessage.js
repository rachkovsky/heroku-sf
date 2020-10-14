const router = require('express').Router();
const outboundService = require('./../utils/outbound_service');

router.post('/', (req, res) => {
    try {
        let outboundList = outboundService.processOutbound(req.body);
        console.log('outboundList: ', outboundList);
        return res.send(outboundService.ack);
    } catch (exception) {
        console.log('outboundList exception: ', exception);
        return res.send(outboundService.nack);
    }
});

module.exports = router;