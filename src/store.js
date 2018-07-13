import { createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import reducers from "./dux/reducers";

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware( history ),
];

// if (process.env.NODE_ENV === "development") {
//   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

//   if (typeof devToolsExtension === "function") {
//     enhancers.push(devToolsExtension())
//   }
// }

const composedEnhancers = compose(
  applyMiddleware( ...middleware ),
  ...enhancers,
);

const store = createStore(
  connectRouter( history )( reducers ),
  initialState,
  composedEnhancers,
);

export default store;
