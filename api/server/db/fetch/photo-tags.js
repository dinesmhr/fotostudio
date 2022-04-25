const pool = require( '../pool' );

let photoTags = {};

photoTags.all = () => {
    return new Promise((resolve, reject) => {
        pool.query( `SELECT * FROM fstudio_tags`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

module.exports = photoTags;