import AppReducer from './index';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const middlewares = createReactNavigationReduxMiddleware(state => state.nav);
const reduxStore = createStore(AppReducer, applyMiddleware(thunk, middlewares));

export default reduxStore;