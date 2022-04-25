const express = require('express');
const users = require('../db/fetch/users');
const router  = express.Router();

router.get( '/', async (req, res, next ) => {
    try {
        let results = await users.all();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;