import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(bodyParser.json())
app.use('/api', routes);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
