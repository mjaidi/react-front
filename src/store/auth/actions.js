import ApiService, { BASE_URL } from "services/Api";
import { authStorage } from "utils/localStorage";
import snackbarActions from "store/snackbars/actions";

const client = new ApiService({ baseURL: BASE_URL });

const NS = "auth";

export const actionTypes = {
  LOGIN: `${NS}/LOGIN`,
  LOGOUT: `${NS}/LOGOUT`,
  SET_LOGGED_IN: `${NS}/SET_LOGGED_IN`
};

const action = (type, payload) => ({ type, payload });

const actions = {
  login: values => {
    return dispatch => {
      return client
        .post(`/login`, {
          user: {
            email: values.email,
            password: values.password
          }
        })
        .then(res => {
          console.log(res);
          authStorage.persist(res.data, res.headers.authorization, 6000);
          dispatch(
            action(actionTypes.LOGIN, {
              user: res.data,
              isLoggedIn: true
            })
          );
          dispatch(
            snackbarActions.newMessage({
              message: "You have successfully logged in",
              type: "success"
            })
          );
        });
    };
  },
  signUp: values => {
    return dispatch => {
      return client
        .post(`/signup`, {
          user: {
            email: values.email,
            password: values.password
          }
        })
        .then(res => {
          dispatch(actions.login(values));
        });
    };
  },
  logout: () => {
    return dispatch => {
      authStorage.clear();
      dispatch(action(actionTypes.LOGOUT));
      dispatch(
        snackbarActions.newMessage({
          message: "You have successfully logged out",
          type: "success"
        })
      );
    };
  },
  setLoggedIn: (payload = {}) => ({ type: actionTypes.SET_LOGGED_IN, payload })
};

export default actions;
