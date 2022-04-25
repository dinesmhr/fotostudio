const express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');

const createSessionRouter = require('./routes/createSession');
const apiRouter = require('./routes');
const apiUsersRouter = require('./routes/users');
const apiUserIdRouter = require('./routes/user_id');
const apiCreateUsersRouter = require('./routes/create-users');
const apiCreateProductRouter = require('./routes/create-product');
const apiCreateSingleUserRouter = require('./routes/single-user');
const apiPhotoCategoriesRouter = require('./routes/photo-categories');
const apiPhotoTagsRouter = require('./routes/photo-tags');
const apiPhotosRouter = require('./routes/photos');
const apisinglePhotoRouter = require('./routes/single-photo');
const apisingleAuthorRouter = require('./routes/single-author');

const app = express();
app.use(cors());
app.use( express.urlencoded({ extended: false }) )
app.use( express.json() );
app.use(cookieParser());

// initialize middleware
app.use(session({
    secret: "Shh, its a secret! - Fotostudio",
    resave: false,
    saveUninitialized: false,
}));


app.use( '/', apiRouter ); // main api url
app.use( '/fotostudio/api/session', createSessionRouter ); // create session
app.use( '/fotostudio/api/users', apiUsersRouter );
app.use( '/fotostudio/api/userid', apiUserIdRouter );
app.use( '/fotostudio/api/create-users', apiCreateUsersRouter );
app.use( '/fstudio-users/fotostudio/api/session', createSessionRouter );
app.use( '/fotostudio/api/create-product', apiCreateProductRouter );
app.use( '/fotostudio/api/single-user', apiCreateSingleUserRouter );
app.use( '/fotostudio/api/photo-categories', apiPhotoCategoriesRouter );
app.use( '/fotostudio/api/photo-tags', apiPhotoTagsRouter );
app.use( '/fotostudio/api/photos', apiPhotosRouter );
app.use( '/fotostudio/api/single-photo', apisinglePhotoRouter );
app.use( '/fotostudio/api/single-author', apisingleAuthorRouter );

app.listen( process.env.PORT || '5000', () => {
    console.log( `Server is running on port: ${process.env.PORT || '5000' }` );
});