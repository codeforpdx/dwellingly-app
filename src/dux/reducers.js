import { combineReducers } from 'redux';

import emergencyNumbers from './emergencyNumbers';
import common from './common';
import user from './user';

export default combineReducers({
  emergencyNumbers,
  common,
  user,
});
