const pool = require( '../pool' );

let singlePhoto = {};

singlePhoto.all = (req) => {
    const photoId = req.params.photoId;
    return new Promise((resolve, reject) => {
        pool.query( `SELECT * FROM fstudio_images WHERE ID = ?`, [photoId], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

module.exports = singlePhoto;