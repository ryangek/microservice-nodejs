var express = require('express');
var app = express();
var axios = require('axios');
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

/* Functions */
function responseJson(res, response) {
  res.json({
    status: response.status,
    statusText: response.statusText,
    data: response.data
  });
}
function handleError(res, error) {
  console.error(error);
  let status = 500;
  if (error.code === 'ECONNREFUSED') {
    status = 404;
  }
  res.json({
    status: status,
    statusText: error.code,
    data: error
  });
}
function callAxios(req, res, next, server) {
  const reqUrl = `${server}${req.originalUrl.replace(req.baseUrl, '')}`;
  const config = {};
  switch (req.method) {
    case 'GET':
      axios
        .get(reqUrl, config)
        .then(response => {
          responseJson(res, response);
        })
        .catch(error => {
          handleError(res, error);
        });
      break;
    case 'POST':
      axios
        .post(reqUrl, req.body, config)
        .then(response => {
          responseJson(res, response);
        })
        .catch(error => {
          handleError(res, error);
        });
      break;
    case 'PUT':
      axios
        .put(reqUrl, req.body, config)
        .then(response => {
          responseJson(res, response);
        })
        .catch(error => {
          handleError(res, error);
        });
    case 'PATCH':
      axios
        .patch(reqUrl, req.body, config)
        .then(response => {
          responseJson(res, response);
        })
        .catch(error => {
          handleError(res, error);
        });
    case 'DELETE':
      axios
        .delete(reqUrl, config)
        .then(response => {
          responseJson(res, response);
        })
        .catch(error => {
          handleError(res, error);
        });
    default:
      res.json({ status: 403, statusText: 'Forbidden', data: req.method });
  }
}
/* Functions */

const PORT = 3000;
const SERVER_USERS = 'http://localhost:3001';
const SERVER_CONFIGS = 'http://localhost:3002';
const SERVER_ITEMS = 'http://localhost:3003';

/* Routes */

/* API Lists */
app.get('/', function(req, res, next) {
  res.json([
    'http://localhost:3000/users',
    'http://localhost:3000/configs',
    'http://localhost:3000/items'
  ]);
});

/* Users */
app.use('/users', function(req, res, next) {
  callAxios(req, res, next, SERVER_USERS);
});
app.use('/users/:request', function(req, res, next) {
  callAxios(req, res, next, `${SERVER_USERS}/${req.params.request}`);
});

/* Configs */
app.use('/configs', function(req, res, next) {
  callAxios(req, res, next, SERVER_CONFIGS);
});
app.use('/configs/:request', function(req, res, next) {
  callAxios(req, res, next, `${SERVER_CONFIGS}/${req.params.request}`);
});

/* Items */
app.use('/items', function(req, res, next) {
  callAxios(req, res, next, SERVER_ITEMS);
});
app.use('/items/:request', function(req, res, next) {
  callAxios(req, res, next, `${SERVER_ITEMS}/${req.params.request}`);
});

app.listen(PORT, () => {
  console.log('Server is running at port ' + PORT);
});
