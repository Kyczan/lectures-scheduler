import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Plan from './components/Plan';
import Speakers from './components/Speakers';
import Lectures from './components/Lectures';
import Congregations from './components/Congregations';

class App extends Component {
  render() {
    return ( 
      <Router>
        <div className="container">
          <NavBar />
          <Route exact path="/" component={Plan} />
          <Route path="/speakers" component={Speakers} />
          <Route path="/lectures" component={Lectures} />
          <Route path="/congregations" component={Congregations} />
        </div>
      </Router>
    );
  }
}

export default App;
