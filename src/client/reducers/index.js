import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import lecturesReducer from './lecturesReducer';
import speakersReducer from './speakersReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
  events: eventsReducer,
  lectures: lecturesReducer,
  speakers: speakersReducer,
  setting: settingsReducer
});
