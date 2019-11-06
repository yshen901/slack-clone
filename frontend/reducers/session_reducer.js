import { RECEIVE_USER, RECEIVE_WORKSPACE, LOGOUT_CURRENT_USER } from '../actions/session_actions';


let DEFAULT_SESSION = {
  user_id: null, 
  workspace_id: null
};

const SessionReducer = (state = DEFAULT_SESSION, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  // TODO: Make sure this doesn't bug out in edge cases...like when someone directly
  //       goes to a link w/ an incorrect workspace name, we gotta redirect immediately
  switch(action.type) {
    case RECEIVE_USER:
      nextState['user_id'] = action.user.id;
      return nextState;
    case RECEIVE_WORKSPACE:
      nextState['workspace_id'] = action.workspace.id;
      return nextState;
    case LOGOUT_CURRENT_USER:
      return DEFAULT_SESSION;
    default:
      return state;
  }
}

export default SessionReducer;