const express = require('express');
const router  = express.Router();

router.get( '/', ( req, res, next ) => {
    req.session.isAuth = true
    console.log(req.session)
    res.send( 'Hi this is seesion' )
    // try {
    //     let results = session.all(req);
    //     res.json(results);
    // } catch(e) {
    //     console.log(e);
    //     res.sendStatus(500);
    // }
});

module.exports = router;