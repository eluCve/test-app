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
      "frame-src": ["'self'", 'https://pagead2.googlesyndication.com/', 'https://tpc.googlesyndication.com/'],
      "script-src": [
        "'self'",
        'https://www.googletagmanager.com',
        'https://region1.google-analytics.com',
        'https://www.paypalobjects.com',
        'https://pagead2.googlesyndication.com',
        'https://fundingchoicesmessages.google.com',
        'https://tpc.googlesyndication.com',
        'nonce-78syRZeYFa66Z3RObGPVjQ'
      ],
      'img-src': [
        "'self'",
        'data:',
        'https://ddragon.leagueoflegends.com',
        'https://pagead2.googlesyndication.com'
      ],
      'connect-src': [
        "'self'",
        'https://region1.google-analytics.com',
        'https://pagead2.googlesyndication.com',
        'https://fundingchoicesmessages.google.com'
      ],
    }
  }
}));
app.use(cors({
  origin: 'https://hexakill.gg'
}));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  if (req.hostname === 'poromentor.gg') {
    return res.redirect(301, 'https://hexakill.gg' + req.originalUrl);
  }
  next();
});

// view engine
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.use(ejs_layouts);

const live = require('./routes/live');
const searchGame = require('./routes/searchGame');
const items = require('./routes/items');
const gameAnalysis = require('./routes/gameAnalysis');

app.get('/', (req, res) => {
  return res.render('home', { page: 'home'})
})

app.use('/privacy-policy', (req, res) => {
  return res.render('privacy-policy', { page: 'privacy-policy' });
});

app.use('/data', express.static('data'));

app.use('/summoner', live);
app.use('/search-game', searchGame);
app.use('/get-items', items);
app.use('/get-analysis', gameAnalysis);

app.get('/blogs/:blogname', (req, res) => {
  const blogname = req.params.blogname;
  res.render(`blogs/${blogname}`, { page: "blog-post" });
});
app.use('/blogs', (req, res) => {
  return res.render('blogs', { page: 'blogs' });
});


app.get('*', (req, res) => {
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
