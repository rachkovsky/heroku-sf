const outboundService = require('./../utils/outbound_service');

app.post('/case', (req, res) => {
    try {
        let outboundList = outboundService.processOutbound(req.body);
        
        console.log('outboundList', outboundList);

        return res.send(outboundService.ack);
    } catch (exception) {
        return res.send(outboundService.nack);
    }
});
