const pool = require( '../pool' );

let photos = {};

photos.all = () => {
    return new Promise((resolve, reject) => {
        pool.query( `SELECT * FROM fstudio_images`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

module.exports = photos;