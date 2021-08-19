// //Install express server
// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve only the static files form the dist directory
// app.use(express.static('./dist/front'));

// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/front/'}),
// );

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);


const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/front'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/front/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5000);