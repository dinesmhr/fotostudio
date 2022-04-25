const express = require('express');
const pool = require( '../db/pool' );
const router  = express.Router();

router.post( '/', ( req, res ) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    return pool.query( "INSERT INTO fstudio_users( username, user_pass, first_name, last_name ) VALUES( ?, ?, ?, ?,?, ? )", [ username, password, firstname, lastname ], (err, results) => {
        if( err ) {
            console.log( err );
        }
        res.send( "success" );
    })
});

module.exports = router;