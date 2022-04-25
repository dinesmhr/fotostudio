const pool = require( '../pool' );

let createUser = {};

createUser.all = ( data ) => {
    const username = data.username;
    const password = data.password;
    const firstname = data.firstname;
    const lastname = data.lastname;
    return pool.query( "INSERT INTO fstudio_users( username, user_pass, first_name, last_name ) VALUES( ?, ?, ?, ?,?, ? )", [ username, password, firstname, lastname ], (err, results) => {
        if(err) {
            return err;
        }
        return "success";
    })
};

module.exports = createUser;