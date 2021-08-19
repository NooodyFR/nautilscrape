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

router.all('/manga/:id', async (req, res) => {

    let results = await require('../functions/getMangaById')(req.params.id);
    if (results === false) {
        res.json({"error": "404"})
    } else {
        res.json(results)
    }

})

router.all('/manga/book/:id/:num', async (req, res) => {


    let results = await require('../functions/getBooksById')(req.params.id, req.params.num);

    res.json(results)

}) 

module.exports = router;