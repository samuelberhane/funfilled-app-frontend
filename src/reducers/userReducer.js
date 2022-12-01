export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { user: payload, loggedin: true, errorText: "" };
    case "LOGGED_OUT":
      return { ...state, loggedin: false, errorText: payload };
    case "REMOVE_TEXT":
      return { ...state, errorText: "" };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
