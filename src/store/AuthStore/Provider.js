import PropTypes from "prop-types";
import { useMemo, useReducer } from "react";
import { toast } from "react-toastify";
import Context from "./Context";
import reducer, { initState } from "./reducer";
import actions from "./actions";
import authServices from "../../services/authServices";

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const value = useMemo(
    () => ({
      ...state,
      loginByPhoneNumber: async (phone, password) => {
        dispatch(actions.fetchApi());
        const res = await authServices.loginByPhoneNumber(phone, password);

        if (res?.success) {
          const { user, message } = res;
          dispatch(actions.login(user));
          dispatch(actions.fetchApiSuccess());
          toast.success(message);
          return true;
        }
        const { message } = res;
        dispatch(actions.fetchApiFailed(message));
        toast.success(message);
        return false;
      },
      logout: async () => {
        dispatch(actions.fetchApi());
        const res = await authServices.logout();
        if (res?.success) {
          dispatch(actions.logout());
          dispatch(actions.fetchApiSuccess());
        } else {
          dispatch(actions.logout());
          dispatch(actions.fetchApiSuccess());
        }
      },
      register: async ({ phoneNumber, email, name, gender, dob, address, password }) => {
        dispatch(actions.fetchApi());
        const res = await authServices.register({ phoneNumber, email, name, gender, dob, address, password });

        if (res?.success) {
          const { message } = res;
          dispatch(actions.fetchApiSuccess());
          toast.success(message);
          return true;
        }
        const { message } = res;
        dispatch(actions.fetchApiFailed(message));
        toast.success(message);
        return false;
      }
    }),
    [state]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
