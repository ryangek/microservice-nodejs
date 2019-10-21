var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
const PORT = 3002;

const data = require('./data');

/* Routes */
app.get('/', function(req, res, next) {
  res.json(data);
});
app.get('/:id', function(req, res, next) {
  const idx = data.findIndex(obj => obj.id == req.params.id);
  if (idx != -1) {
    res.json(data[idx]);
  } else {
    res.json({
      id: null,
      name: '',
      value: ''
    });
  }
});
/* Routes */

app.listen(PORT, () => {
  console.log('Server is running at port ' + PORT);
});
