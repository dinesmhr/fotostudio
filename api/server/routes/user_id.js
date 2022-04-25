const express = require('express');
const fotostudioserid = require('../db/fetch/user_id');
const router  = express.Router();

router.get( '/:username', async ( req, res, next ) => {
    try {
        let results = await fotostudioserid.all(req);
        res.send(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;