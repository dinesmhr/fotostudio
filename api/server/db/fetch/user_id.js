const pool = require( '../pool' );

let fotostudioserid = {};

fotostudioserid.all = (req) => {
    const username = req.params.username;
    return new Promise((resolve, reject) => {
        pool.query( `SELECT Id FROM fstudio_users WHERE username = ?`, [username], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

module.exports = fotostudioserid;