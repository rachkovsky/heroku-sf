const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

module.exports = client;