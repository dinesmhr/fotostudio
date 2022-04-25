let fotostudiosers = {};

fotostudiosers.all = (req) => {
    if( req.params.isLoggedin === "true" ) {
        req.session.isLoggedin = req.params.isLoggedin;
        req.session.username = req.params.username;
        return req.session;
    } else if( req.params.isLoggedin === "false" ) {
        req.session.isLoggedin = req.params.isLoggedin;
        return req.session;
    } else {
        return req.session;
    }
};

module.exports = fotostudiosers;