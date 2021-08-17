const express = require('express');
const router = express.Router();

router.all('/', async (req, res) => {

    res.json({
        "nautilscrape": "1.0.0",
        "status": 200
    })

})

router.all('/search/manga/:name', async (req, res) => {

    let results = await require('../functions/searchManga')(req.params.name);
    res.json(results)

})

module.exports = router;