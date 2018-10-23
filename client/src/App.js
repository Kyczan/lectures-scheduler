import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CongregationsIcon from '@material-ui/icons/Public';
import LecturesIcon from '@material-ui/icons/Assignment';
import EventsIcon from '@material-ui/icons/EventNote';
import SpeakersIcon from '@material-ui/icons/SupervisorAccount';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import store from './store';
import NavBar from './components/utils/navBar';
import Events from './components/events/events';
import Speakers from './components/speakers/speakers';
import Lectures from './components/lectures/lectures';
import Congregations from './components/congregations/congregations';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      sortInput: {
        sortKey: null,
        direction: null
      },
      sortKeys: [],
      label: ''
    };
  }

  handleFilter = searchText => {
    this.setState({ searchText });
  };

  handleSort = sortObj => {
    this.setState({
      sortInput: {
        ...this.state.sortInput,
        ...sortObj
      }
    });
  };

  handleInit = obj => {
    this.setState({
      ...this.state,
      sortInput: obj.sortInput,
      sortKeys: obj.sortKeys,
      label: obj.label
    });
  };

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: blue,
        secondary: pink
      },
      typography: {
        useNextVariants: true
      }
    });
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
    const Routes = routesData.map(route => {
      const Comp = route.component;
      return (
        <Route
          key={route.link}
          exact
          path={route.link}
          render={() => (
            <Comp
              searchText={this.state.searchText}
              sortInput={this.state.sortInput}
              handleInit={this.handleInit}
            />
          )}
        />
      );
    });
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <NavBar
                handleInit={this.handleInit}
                buttonsData={routesData}
                onFilter={this.handleFilter}
                onSort={this.handleSort}
                sortKeys={this.state.sortKeys}
                sortInput={this.state.sortInput}
                label={this.state.label}
              />
              {Routes}
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
