const pool = require( '../pool' );

let createProduct = {};

createProduct.all = ( data ) => {
    const author_id     = data.author_id;
    const image_title   = data.image_title;
    const image_description = data.image_description;
    const image_name    = data.image_name;
    const image_extension   = data.image_extension;
    const image_tags        = data.image_tags;
    const image_categories  = data.image_categories;
    return pool.query( "INSERT INTO fstudio_images( author_id, image_title, image_description, image_name, image_extension, image_tags, image_categories ) VALUES( ?, ?, ?, ?,?, ? )", [ author_id, image_title, image_description, image_name, image_extension, image_tags, image_categories ], (err, results) => {
        if(err) {
            return err;
        }
        return results;
    })
};

module.exports = createProduct;