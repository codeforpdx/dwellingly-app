import { combineReducers } from 'redux';

import emergencyNumbers from './emergencyNumbers';
import propertyManagers from './propertyManagers';
import properties from './properties';
import common from './common';
import user from './user';

export default combineReducers({
  propertyManagers,
  properties,
  emergencyNumbers,
  common,
  user,
});
