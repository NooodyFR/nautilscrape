const express = require('express');
const helmet = require('helmet');

const app = express()
const api_routes = require('./src/routes/api')

app.use(helmet());

app

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})