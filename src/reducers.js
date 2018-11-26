import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import initialState from 'initialState';
import { logUserIn, updateUser } from 'routines';


function user(state = initialState.user, action) {
  switch (action.type) {
    case logUserIn.TRIGGER:
    case updateUser.TRIGGER:
      return { ...state, loading: true };
    case logUserIn.SUCCESS:
    case updateUser.SUCCESS:
      return { ...state, ...action.payload, status: 'success' };
    case logUserIn.FAILURE:
    case updateUser.FAILURE:
      return { ...state, status: 'error' };
    case logUserIn.FULFILL:
    case updateUser.FULFILL:
      return { ...state, loading: false };
    default:
      return state;
  }
}

const rootReducer = history => combineReducers({
  user,
  router: connectRouter(history),
});

export default rootReducer;
