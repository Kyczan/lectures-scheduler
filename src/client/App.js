import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CongregationsIcon from '@material-ui/icons/Public';
import LecturesIcon from '@material-ui/icons/Assignment';
import EventsIcon from '@material-ui/icons/EventNote';
import SpeakersIcon from '@material-ui/icons/SupervisorAccount';

import store from './store';
import NavBar from './components/utils/navBar';
import Events from './components/events/events';
import Speakers from './components/speakers/speakers';
import Lectures from './components/lectures/lectures';
import Congregations from './components/congregations/congregations';

class App extends Component {
  render() {
    const routesData = [
      {
        label: 'Plan',
        link: '/',
        icon: <EventsIcon />,
        component: Events
      },
      {
        label: 'Mówcy',
        link: '/speakers',
        icon: <SpeakersIcon />,
        component: Speakers
      },
      {
        label: 'Wykłady',
        link: '/lectures',
        icon: <LecturesIcon />,
        component: Lectures
      },
      {
        label: 'Zbory',
        link: '/congregations',
        icon: <CongregationsIcon />,
        component: Congregations
      }
    ];
    const Routes = routesData.map(route => (
      <Route
        key={route.link}
        exact
        path={route.link}
        component={route.component}
      />
    ));
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavBar buttonsData={routesData} />
            {Routes}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
