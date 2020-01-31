import axios from "axios";
import { BASE_API_URL, AUTH_HEADERS } from "../../utils/axiosConfig";

const NS = "landing";

export const actionTypes = {
  SET_MESSAGE: `${NS}/SET_MESSAGE`
};

const action = (type, payload) => ({ type, payload });

const actions = {
  getMessage: () => {
    return dispatch => {
      return axios
        .get(`${BASE_API_URL}/main`, AUTH_HEADERS)
        .then(res => {
          dispatch(action(actionTypes.SET_MESSAGE, res.data.message));
        })
        .catch(err => {
          alert(JSON.stringify(err.response.data));
        });
    };
  }
};

export default actions;
