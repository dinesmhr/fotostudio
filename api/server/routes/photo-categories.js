const express = require('express');
const photoCategories = require('../db/fetch/photo-categories');
const router  = express.Router();

router.get( '/', async ( req, res, next ) => {
    try {
        let results = await photoCategories.all();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;