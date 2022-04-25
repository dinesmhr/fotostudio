const express = require('express');
const fotostudioser = require('../db/fetch/single-user');
const router  = express.Router();

router.get( '/:id', ( req, res, next ) => {
    try {
        let results = fotostudioser.all(req);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;