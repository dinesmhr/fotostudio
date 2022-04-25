const pool = require( '../pool' );

let singleAuthor = {};

singleAuthor.all = (req) => {
    const authorId = req.params.authorId;
    return new Promise((resolve, reject) => {
        pool.query( `SELECT * FROM fstudio_users WHERE Id = ?`, [authorId], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

module.exports = singleAuthor;