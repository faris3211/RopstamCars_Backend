const app = require('express')();
const cors = require('cors');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const connectDB = require('./config/db');

app.use(cors());
app.use(timeout('60s'));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/', (req, res) => {
  res.json('Its Working');
});
app.use('/api', routes);

connectDB();

app.listen(8000, () => {
  console.log(`server running on port ${8000}`);
});
