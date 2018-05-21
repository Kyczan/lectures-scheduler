const path = require('path');
global.appRoot = path.resolve(__dirname);

const app = require('express')();
const bodyParser = require('body-parser')
const routes = require('./routes');

app.use(bodyParser.json())
//  Connect all our api routes to our application
app.use('/api', routes);

// Turn on that server!
app.listen(3000, () => {
  console.log('App listening on port 3000');
});
