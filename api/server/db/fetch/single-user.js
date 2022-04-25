let fotostudioser = {};

fotostudioser.all = (req) => {
    const id = req.params.id;
    return new Promise((resolve, reject) => {
        pool.query( `SELECT * FROM fstudio_users WHERE Id = ?`, [id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

module.exports = fotostudioser;