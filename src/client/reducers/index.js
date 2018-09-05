import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import lecturesReducer from './lecturesReducer';
import speakersReducer from './speakersReducer';
import settingsReducer from './settingsReducer';
import congregationsReducer from './congregationsReducer';

export default combineReducers({
  events: eventsReducer,
  lectures: lecturesReducer,
  speakers: speakersReducer,
  congregations: congregationsReducer,
  setting: settingsReducer
});
