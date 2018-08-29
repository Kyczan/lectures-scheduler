import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  Contacts as SpeakersIcon,
  EventNote as EventsIcon,
  FileCopy as LecturesIcon,
  Public as CongregationsIcon
} from '@material-ui/icons';

import store from './store';
import NavBar from './components/NavBar';
import Events from './components/Events';
import Speakers from './components/Speakers';
import Lectures from './components/Lectures';
import Congregations from './components/Congregations';

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
