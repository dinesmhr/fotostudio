const express = require('express');
const photoTags = require('../db/fetch/photo-tags');
const router  = express.Router();

router.get( '/', async ( req, res, next ) => {
    try {
        let results = await photoTags.all();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;