import { combineReducers } from 'redux';
import { RootNavigator } from '../navigations/AppNavigation';
import { auth } from '../Core/onboarding/redux/auth';
import { friends } from '../Core/socialgraph/friendships/redux';
import { chat } from '../Core/chat/redux';
import { audioVideoChat } from '../Core/chat/audioVideo/redux';
import { userReports } from '../Core/user-reporting/redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

const LOG_OUT = 'LOG_OUT';

const navReducer = createNavigationReducer(RootNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  auth,
  friends,
  userReports,
  chat,
  audioVideoChat,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
