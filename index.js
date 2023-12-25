const express = require('express');
const ejs_layouts = require('express-ejs-layouts');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB;
const host = process.env.MONGO_HOST;
const replicaSet = process.env.REPLICA_SET;

const mongoURI = `mongodb+srv://${username}:${password}@${host}/${dbName}?authSource=admin&replicaSet=${replicaSet}`;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const app = express();

// middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", 'https://www.googletagmanager.com', 'https://www.paypalobjects.com','https://cdn.jsdelivr.net/npm/chart.js'],
      'img-src': ["'self'", 'data:', 'https://ddragon.leagueoflegends.com'],
    }
  }
}));
app.use(cors({
  origin: 'https://poromentor.gg'
}));
app.use(express.json());
app.use(express.static('public'));


// view engine
app.set('view engine', 'ejs');
app.use(ejs_layouts);

const live = require('./routes/live');
const api = require('./routes/api.js')

app.get('/', (req, res) => {
  return res.render('home', { page: 'home'})
})

app.use('/live', live);

app.use('/api', api);

app.get('*', (req, res) => {
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
