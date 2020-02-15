import { actionTypes } from "./actions";

const getInitialState = () => ({
  isLoggedIn: false,
  user: null,
  token: null
});

const auth = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case actionTypes.SET_TOKEN:
      return { ...state, token: localStorage.getItem("token") };
    case actionTypes.LOGIN:
      return {
        ...state,
        ...payload
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null
      };
    case actionTypes.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: JSON.parse(localStorage.getItem("user"))
      };
    default:
      return state;
  }
};

export default auth;
