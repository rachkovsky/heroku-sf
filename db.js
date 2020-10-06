const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:0057@localhost:5432/todo_app';
const client = new Client(connectionString);

module.exports = client;