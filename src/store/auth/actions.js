import axios from "axios";
import { BASE_URL } from "../../utils/axiosConfig";
import { authStorage } from "../../utils/localStorage";

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
      return axios
        .post(`${BASE_URL}/login`, {
          user: {
            email: values.email,
            password: values.password
          }
        })
        .then(res => {
          authStorage.persist(res.data, res.headers.authorization, 6000);
          dispatch(
            action(actionTypes.LOGIN, {
              user: res.data,
              isLoggedIn: true
            })
          );
        })
        .catch(err => {
          alert(JSON.stringify(err.response.data));
        });
    };
  },
  signUp: values => {
    return dispatch => {
      return axios
        .post(`${BASE_URL}/signup`, {
          user: {
            email: values.email,
            password: values.password
          }
        })
        .then(res => {
          console.log(res);
          dispatch(actions.login(values));
        })
        .catch(err => {
          alert(JSON.stringify(err.response.data));
        });
    };
  },
  logout: () => {
    return dispatch => {
      authStorage.clear();
      dispatch(action(actionTypes.LOGOUT));
    };
  },
  setLoggedIn: (payload = {}) => ({ type: actionTypes.SET_LOGGED_IN, payload })
};

export default actions;
