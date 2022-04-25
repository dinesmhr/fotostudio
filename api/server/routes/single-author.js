const express = require('express');
const singleAuthor = require('../db/fetch/single-author');
const router  = express.Router();

router.get( '/:authorId', async ( req, res, next ) => {
    try {
        let results = await singleAuthor.all(req);
        console.log(results)
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;