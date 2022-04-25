const express = require('express');
const singlePhoto = require('../db/fetch/single-photo');
const router  = express.Router();

router.get( '/:photoId', async ( req, res, next ) => {
    try {
        let results = await singlePhoto.all(req);
        console.log(results)
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;