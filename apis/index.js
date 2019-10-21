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
function callAxios(req, res, next, server) {
  const reqUrl = `${server}${req.originalUrl.replace(req.baseUrl, '')}`;
  switch (req.method) {
    case 'GET':
      axios.get(reqUrl).then(({ data }) => {
        res.json(data);
      }).catch(error => {
        console.error(error);
        res.end();
      });
      break;
    case 'POST':
      axios.post(reqUrl, req.body).then(({ data }) => {
        res.json(data);
      }).catch(error => {
        console.error(error);
        res.end();
      });
      break;
    case 'PUT':
      res.json({ status: 200, textStatus: 'OK' });
    case 'PATCH':
      res.json({ status: 200, textStatus: 'OK' });
    case 'DELETE':
      res.json({ status: 200, textStatus: 'OK' });
    default:
      res.json({ status: 200, textStatus: 'OK' });
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
