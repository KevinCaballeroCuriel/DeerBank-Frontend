/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import signinbg from "../assets/images/logoHD.png";
import { errorModalAlert, successModalAlert } from "../utils/ModalAlert";
import LoginHook from "../hooks/LoginHook";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignIn = () => {
  const history = useHistory();
  const { loginInfo, login, setAuthorizationHeader } = LoginHook();

  const onFinish = async (values) => {
    console.log("Success:", values);
    await login(values);
    setAuthorizationHeader();
    console.log(loginInfo);
  };

  useEffect(() => {
    try {
      function fetchData() {
        setAuthorizationHeader(loginInfo.token);
        if (loginInfo.name !== "") {
          loginInfo.type === "Cajero"
            ? history.push("/transactions")
            : history.push("/clients");
        }
      }
      if (loginInfo.token !== "") {
        fetchData();
      }
    } catch (error) {
      errorModalAlert("Error al momento de iniciar sesion");
    }
  }, [loginInfo]);

  const onFinishFailed = (errorInfo) => {
    errorModalAlert("Usuario y/o contraseña incorrectos");
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout
        style={{ backgroundColor: "#f0f0f0" }}
        className="layout-default layout-signin"
      >
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Inicio de Sesión</Title>
              <Title className="font-regular text-muted" level={5}>
                Ingrese su correo y su contraseña para iniciar sesión
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "El correo es requerido",
                    },
                    {
                      type: "email",
                      message: "Los datos del correo son incorrectos",
                    },
                  ]}
                  label="Correo"
                  name="email"
                >
                  <Input placeholder="correo@deerland.com"></Input>
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "El correo es requerido",
                    },
                  ]}
                  label="Contraseña"
                  name="password"
                >
                  <Input.Password
                    maxLength="16"
                    size="small"
                    className="rounded-lg"
                    placeholder="Contraseña"
                  ></Input.Password>
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} />
                  Recordarme
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    <span className="font-bold">Iniciar Sesión</span>
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  ¿No tienes una cuenta?{" "}
                  <span className="text-dark font-bold">
                    Asiste a una sucursal para generarla
                  </span>
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} height="90%" alt="" />
            </Col>
          </Row>
        </Content>
        <Footer>
          <p className="copyright">
            Copyright © 2022 DeerBank by<a href="#">DeerTeam.</a>
          </p>
        </Footer>
      </Layout>
    </>
  );
};

export default SignIn;
