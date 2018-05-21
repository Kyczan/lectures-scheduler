const path = require('path');
global.appRoot = path.resolve(__dirname);

const app = require('express')();
const routes = require('./routes');

//  Connect all our api routes to our application
app.use('/api', routes);

// Turn on that server!
app.listen(3000, () => {
  console.log('App listening on port 3000');
});
