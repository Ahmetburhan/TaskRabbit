// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var bodyParser = require("body-parser");

// const upload = multer({
//   dest: 'uploads/' // this saves your file into a directory called "uploads"
// }); 

const express = require('express');
const multer = require('multer');
const upload = multer({
  dest: 'public/uploads/' // this saves your file into a directory called "uploads"
});

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/cms.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/public', upload.single('fileUpload'), (req, res) => {
  res.redirect('/');
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/cms.html');
// });

// // It's very crucial that the file name matches the name attribute in your html
// app.post('/', upload.single('file-to-upload'), (req, res) => {
//   res.redirect('/blog.html');
// });

// $(document).ready(function () {
//   var addressPicker = new AddressPicker();

//   $('#zip_code').typeahead(null, {
//     displayKey: 'description',
//     source: addressPicker.ttAdapter()
//   });
//   console.log("ready!");
// });
// Sets up the Express App
// =============================================================
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");


// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

