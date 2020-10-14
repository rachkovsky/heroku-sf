const throng = require('throng');
const Queue = require("bull");
const pgClient = require('./db');
pgClient.connect();

let REDIS_URL = process.env.REDIS_URL;
let workers = process.env.WEB_CONCURRENCY || 2;
let maxJobsPerWorker = 5;


function start() {
    // Connect to the named work queue
    let workQueue = new Queue('work', REDIS_URL);

    workQueue.process(maxJobsPerWorker, function (job, done) {
        console.log('job ------- ', job.data)
        client.query('INSERT INTO cases (case_id, status) VALUES ($1, $2)', [job.data.Id, job.data.Status], (err, result) => {
            if (err) {
                console.log(err);
                done();
            }
            console.log('Postgres result: ', result)
            done();
        });
    });
}

throng({ workers, start });