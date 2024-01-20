import { createStore } from 'redux';

const initialState = {
  loggedInUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedInUser: true,
      };

    default:
      return state;
  }
};

export default createStore(reducer);
