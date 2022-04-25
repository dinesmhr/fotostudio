const express = require('express');
const pool = require( '../db/pool' );
//const createProduct = require('../db/create/create-product');
const router  = express.Router();

router.post( '/', ( req, res ) => {
    // let results = createProduct.all( req.body );
    // res.json( results );
    const author_id     = req.body.author_id;
    const image_title   = req.body.image_title;
    const image_description = req.body.image_description;
    const image_name    = req.body.image_name;
    const image_extension   = req.body.image_extension;
    const image_tags        = req.body.image_tags;
    const image_categories  = req.body.image_categories;
    const file  = req.body.file;
    console.log( file );
    res.send( 'Check' );
    return pool.query( "INSERT INTO fstudio_images( author_id, image_title, image_description, image_name, image_extension, images_tags, image_categories ) VALUES( ?, ?, ?, ?,?, ?, ? )", [ author_id, image_title, image_description, image_name, image_extension, image_tags, image_categories ], (err, results) => {
        if(err) {
            console.log( err );
        }
        res.send( "success" );
    })
});

module.exports = router;