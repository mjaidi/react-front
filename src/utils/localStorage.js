export const authStorage = {
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
    console.log(user);
    // expiration date is current time + expires_in
    const tokenExpDate = new Date(new Date().getTime() + expriseIn * 1000);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpDate", tokenExpDate);
  }
};
