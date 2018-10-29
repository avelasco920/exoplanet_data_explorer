import { combineReducers } from 'redux';

import entities from './entities_reducer';
// import ui from './ui_reducer';

const rootReducer = combineReducers({
  entities,
  // ui
});

export default rootReducer;
