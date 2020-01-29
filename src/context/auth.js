import React, { Component } from "react";
import axios from "axios";
const authStorage = {
  /**
   * Removes auth data (token & token expiration date)
   * from local storage
   */
  clear: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpDate");
  },

  /**
   * persist auth data (user, token & token expiration date) to
   * local storage
   */
  persist: (user, token, expriseIn) => {
    // expiration date is current time + expires_in
    const tokenExpDate = new Date(new Date().getTime() + expriseIn * 1000);
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpDate", tokenExpDate);
  }
};

const AuthContext = React.createContext();
class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null
    };
  }

  logIn = values => {
    axios
      .post("http://localhost:3000/login", {
        user: {
          email: values.email,
          password: values.password
        }
      })
      .then(res => {
        authStorage.persist(res.data, res.headers.authorization, 6000);
        this.setState({
          user: res.data,
          isLoggedIn: true
        });
      })
      .catch(err => {
        alert(JSON.stringify(err.response.data));
      });
  };

  signUp = values => {
    axios
      .post("http://localhost:3000/signup", {
        user: {
          email: values.email,
          password: values.password
        }
      })
      .then(res => {
        this.logIn(values);
      })
      .catch(err => {
        alert(JSON.stringify(err.response.data.errors[0].detail));
      });
  };

  logOut = () => {
    authStorage.clear();
    this.setState({
      isLoggedIn: false
    });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.logOut();
    } else {
      const tokenExpDate = new Date(localStorage.getItem("tokenExpDate"));
      // if token hasn't expired
      if (tokenExpDate > new Date()) {
        this.setState({
          isLoggedIn: true
        });
      } else {
        this.logOut();
      }
    }
  }
  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          logIn: this.logIn,
          logOut: this.logOut,
          signUp: this.signUp
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const Consumer = AuthContext.Consumer;
export const Provider = AuthProvider;
