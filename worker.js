const throng = require('throng');
const Queue = require("bull");

let REDIS_URL = process.env.REDIS_URL;
let workers = process.env.WEB_CONCURRENCY || 2;
let maxJobsPerWorker = 5;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
// Connect to the named work queue
let workQueue = new Queue('work', REDIS_URL);

workQueue.process(maxJobsPerWorker, async (job) => {
    // This is an example job that just slowly reports on progress
    // while doing no work. Replace this with your own job logic.
    let progress = 0;

    // throw an error 5% of the time
    if (Math.random() < 0.05) {
        throw new Error("This job failed!")
    }

    while (progress < 100) {
        await sleep(50);
        progress += 1;
        job.progress(progress)
    }

    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
    return { value: "This will be stored" };
});
}


throng({ workers, start });