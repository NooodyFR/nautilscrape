const express = require('express');
const router = express.Router();

router.all('/', async (req, res) => {

    res.json({
        "nautilscrape": "1.0.0",
        "status": 200
    })

})