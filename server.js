const path = require('path');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
const port = process.env.PORT || 4200;

// Serve static files
app.use(express.static(__dirname + '/dist/front'));

// BodyParser
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(bodyParser.json());

// Cors
// app.use(cors());

// Send all requests to index.html
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/dist/prueba-login/index.html'));
// });

// Headers
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// const forceSSL = function () {
//   return function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect(
//         ['https://', req.get('Host'), req.url].join('')
//       );
//     }
//     next();
//   }};

//   app.use(forceSSL());

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname + '/dist/front/index.html'));
     });


// default Heroku port
app.listen(port, () => {
  console.log('Server started on port '+ port);
  });