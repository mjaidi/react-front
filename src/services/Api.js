import axios from "axios";
import store from "../store";
import snackbarActions from "store/snackbars/actions";

export const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://rails-jwt-template-123.herokuapp.com";
export const BASE_API_URL = `${BASE_URL}/api/v1`;

// Default API will be your root
const TIMEOUT = 20000;
const HEADERS = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*"
  }
};

class ApiService {
  constructor({
    baseURL = BASE_URL,
    timeout = TIMEOUT,
    headers = HEADERS,
    auth
  }) {
    const client = axios.create({
      baseURL,
      timeout,
      headers,
      auth
    });

    client.interceptors.response.use(this.handleSuccess, this.handleError);
    this.client = client;
    this.headers = headers;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    if (process.env !== "production") {
      console.log(error.response);
    }
    store.dispatch(
      snackbarActions.newMessage({
        message: `Error - ${
          error.response ? error.response.data.error : error
        }`,
        type: "error"
      })
    );
    return Promise.reject(error);
  }

  get(path) {
    this.headers.headers.Authorization = store.getState().auth.token;
    return this.client.get(path, this.headers);
  }

  post(path, payload) {
    this.headers.headers.Authorization = store.getState().auth.token;
    return this.client.post(path, payload, this.headers);
  }

  put(path, payload) {
    this.headers.headers.Authorization = store.getState().auth.token;
    return this.client.put(path, payload, this.headers);
  }

  patch(path, payload) {
    this.headers.headers.Authorization = store.getState().auth.token;
    return this.client.patch(path, payload, this.headers);
  }

  delete(path) {
    this.headers.headers.Authorization = store.getState().auth.token;
    return this.client.delete(path, this.headers);
  }
}

export default ApiService;
