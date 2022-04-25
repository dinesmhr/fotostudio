const pool = require( '../pool' );

let fotostudiosers = {};

fotostudiosers.all = () => {
    return new Promise((resolve, reject) => {
        pool.query( `SELECT * FROM fstudio_users`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

module.exports = fotostudiosers;