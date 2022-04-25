const pool = require( '../pool' );

let photoCategories = {};

photoCategories.all = () => {
    return new Promise((resolve, reject) => {
        pool.query( `SELECT * FROM fstudio_categories`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

module.exports = photoCategories;