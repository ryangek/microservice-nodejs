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
const PORT = 3001;

/* Routes */
app.get('/', function(req, res, next) {
  res.json([
    {
      id: 1,
      username: 'nxf56046',
      name: 'Arthit Kanjai',
      UID: 5115
    }
  ]);
});
/* Routes */

app.listen(PORT, () => {
  console.log('Server is running at port ' + PORT);
});
