import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_ATTEMPTED,
  LOGIN_USER_FAIL,
  PROFILE_PIC_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  user: null,
  isAuthenticated: false,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_ATTEMPTED:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, error: null, loading: false };
    case LOGIN_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PROFILE_PIC_CHANGED:
      return { ...state, avatar: action.payload };

    default:
      return state;
  }
};
