import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import NavBar from './components/NavBar';
import Events from './components/Events';
import Speakers from './components/Speakers';
import Lectures from './components/Lectures';
import Congregations from './components/Congregations';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" component={Events} />
            <Route path="/speakers" component={Speakers} />
            <Route path="/lectures" component={Lectures} />
            <Route path="/congregations" component={Congregations} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
