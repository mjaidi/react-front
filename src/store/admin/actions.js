import ApiService, { BASE_API_URL, AUTH_HEADERS } from "services/Api";
const client = new ApiService({ headers: AUTH_HEADERS, baseURL: BASE_API_URL });

const NS = "admin";

export const actionTypes = {
  SET_MESSAGE: `${NS}/SET_MESSAGE`
};

const action = (type, payload) => ({ type, payload });

const actions = {
  getMessage: () => {
    return dispatch => {
      return client.get(`/admin`).then(res => {
        dispatch(action(actionTypes.SET_MESSAGE, res.data.message));
      });
    };
  }
};

export default actions;
