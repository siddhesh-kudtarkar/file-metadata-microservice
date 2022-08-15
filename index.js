var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var formidable = require('formidable');
require('dotenv').config()

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
      if (error) {
        throw new Error('Error in analysing the uploaded file.');
      }

      res.status(200).json({
        name: files.upfile.originalFilename,
        type: files.upfile.mimetype,
        size: files.upfile.size
      });
    });
    
  } catch(error) {
    res.status(400).json({
      message: "Error in analysing the uploaded file."
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
