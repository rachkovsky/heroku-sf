const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const workQueue = new Queue('work', REDIS_URL);

const router = require('express').Router();
const outboundService = require('./../utils/outbound_service');

router.post('/', (req, res) => {
    try {
        let outboundList = outboundService.processOutbound(req.body);
        console.log('outboundList: ', outboundList);

        workQueue.add(outboundList[0]);

        return res.send(outboundService.ack);
    } catch (exception) {
        console.log('outboundList exception: ', exception);
        return res.send(outboundService.nack);
    }
});

module.exports = router;