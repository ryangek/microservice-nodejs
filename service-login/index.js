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

/* Routes */
app.post('/login', function(req, res, next) {
  const response = {
    statusCode: 200,
    statusText: "OK",
    data: {}
  };
  const { username, password } = req.body;
  const user = Buffer.from(username, 'base64').toString();
  const pass = Buffer.from(password, 'base64').toString();

  if (user === "admin" && pass === "password") {
    response.statusText = "SUCCESS";
  } else {
    response.statusText = "FAIL";
  }
  
  res.json(response);
});
/* Routes */

app.listen(PORT, () => {
  console.log('Server is running at port ' + PORT);
});
