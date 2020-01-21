const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello Template!');
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});

module.exports = app;
