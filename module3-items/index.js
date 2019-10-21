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
const PORT = 3003;

/* Routes */
app.get('/', function(req, res, next) {
  res.json([
    {
      id: 1,
      name: 'Item Name 1'
    },
    {
      id: 2,
      name: 'Item Name 2'
    },
    {
      id: 3,
      name: 'Item Name 3'
    }
  ]);
});
/* Routes */

app.listen(PORT, () => {
  console.log('Server is running at port ' + PORT);
});
