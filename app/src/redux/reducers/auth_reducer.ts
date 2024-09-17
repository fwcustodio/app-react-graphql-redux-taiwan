// authReducer.ts
import { AuthState, LOGIN_SUCCESS, LOGIN_FAILURE } from "../types/auth_types";

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    default:
      return state;
  }
};
