import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/api', routes);

app.get('/', (req, res) => 
  res.sendFile('index.html')
);
app.get('*', (req, res) => 
  res.redirect('/')
);

app.listen(3000);
