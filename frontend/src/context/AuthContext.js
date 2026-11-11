import { createContext, useEffect, useReducer } from "react";

const getUserFromStorage = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr || userStr === "undefined" || userStr === "null") return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

const initial_state = {
  user: getUserFromStorage(),
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { user: action.payload, loading: false, error: null };
    case "LOGIN_FAILURE":
      return { user: null, loading: false, error: action.payload };
    case "REGISTER_SUCCESS":
      return { user: null, loading: false, error: null };
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : action.payload,
      };
    case "LOGOUT":
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    if (state.user === null) {
      localStorage.removeItem("user");
    } else if (state.user !== undefined) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  const updateUser = (patch) => {
    dispatch({ type: "UPDATE_USER", payload: patch });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};