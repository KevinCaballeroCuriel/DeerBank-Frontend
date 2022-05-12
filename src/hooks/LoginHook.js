import { useCallback, useState } from "react";
import { http, setToken } from "../services/HttpService";
import { Modal } from "antd";

const ILogin = {
  token: "",
  email: "",
  name: "",
  type: "",
};

const LoginHook = () => {
  const [loginInfo, setLoginInfo] = useState(ILogin);

  const verifyToken = async (token) => {
    try {
      await http.post(`/verify/`, { token: token });
    } catch (error) {
      Modal.error({
        title: `No se ha podido verificar el token`,
        content: `${error.response.data.message}`,
      });
    } finally {
      Modal.success({
        title: "Se ha verificado el token",
      });
    }
  };

  const login = async (data) => {
    try {
      await http.post(`/login/`, data).then((response) => {
        if (response.data.hasOwnProperty("non_field_errors")) {
          Modal.error({
            title: `Correo y/o contraseñas incorrectos`,
          });
        } else {
          setLoginInfo({
            ...loginInfo,
            name: response.data.name,
            token: response.data.token,
            type: response.data.type,
            email: response.data.email,
          });
          localStorage.setItem("loginName", response.data.name);
          localStorage.setItem("loginType", response.data.type);
        }
      });
    } catch (error) {
      Modal.error({
        title: `Correo y/o contraseñas incorrectos`,
      });
    }
  };

  const setAuthorizationHeader = (token) => {
    setToken(token);
  };

  return {
    loginInfo,
    setLoginInfo,
    verifyToken,
    login,
    setAuthorizationHeader,
  };
};

export default LoginHook;
