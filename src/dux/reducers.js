import { combineReducers } from 'redux';

import emergencyNumbers from './emergencyNumbers';
import properties from './properties';
import common from './common';
import user from './user';

export default combineReducers({
  properties,
  emergencyNumbers,
  common,
  user,
});
