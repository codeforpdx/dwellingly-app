import { combineReducers } from 'redux';

import emergencyNumbers from './emergencyNumbers';
import propertyManagers from './propertyManagers';
import common from './common';
import user from './user';

export default combineReducers({
  propertyManagers,
  emergencyNumbers,
  common,
  user,
});
