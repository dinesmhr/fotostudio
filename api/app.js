// const express = require( 'express' )
// const app = express()
// const port = 5000

// var Connection = require( 'tedious' ).Connection
// var Request = require( 'tedious' ).Request

// var config = {
//   server: 'localhost',
//   authentication: {
//     type: 'default',
//     options: {
//       userName: 'root',
//       password: ''
//     }
//   }
// }

// var connection = new Connection( config )

// connection.on( 'connect', function ( err ) {
//   if ( err ) {
//     console.log( err )
//   } else {
//     executeStatement()
//   }
// })

// function executeStatement() {
//   request = new Request( "select 123, 'hello world'", function ( err, rowCount ) {
//   if ( err ) {
//     console.log( err )
//   } else {
//     console.log( rowCount + ' rows' )
//   }
//   connection.close()
// })

// request.on( 'row', function ( columns ) {
//   columns.forEach( function ( column ) {
//     if ( column.value === null ) {
//       console.log( 'NULL' )
//     } else {
//       console.log( column.value )
//     }
//   })
// })
//   connection.execSql( request )
// }

// app.get( '/', ( req, res ) => {
//   res.send( 'Hello World!' )
// })

// app.listen( port, () => {
//   console.log( `Example app listening at http://localhost:${port}` )
// })