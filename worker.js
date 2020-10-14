const throng = require('throng');
const Queue = require("bull");
const pgClient = require('./db');
pgClient.connect();

let REDIS_URL = process.env.REDIS_URL;
let workers = process.env.WEB_CONCURRENCY || 2;
let maxJobsPerWorker = 5;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
    // Connect to the named work queue
    let workQueue = new Queue('work', REDIS_URL);

    workQueue.process(maxJobsPerWorker, function (job, done) {

        console.log('------- ', job)
        client.query('INSERT INTO cases (case_id, status) VALUES ($1, $2)', ['123123123', 'new'], (err, result) => {
            if (err) {
                console.log(err);
                done();
            }
            done();
            console.log(result);
        });
        return { value: "This will be stored" };
    });
}


throng({ workers, start });