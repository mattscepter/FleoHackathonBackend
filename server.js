const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongo = require('./config/mongo');

//mongo connection func call
mongo();

dotenv.config();
const app = express();

const categoryRouter = require('./routes/category');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/api', categoryRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`, 'SERVER');
});
