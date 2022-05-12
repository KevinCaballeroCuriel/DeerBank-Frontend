import React, { useState } from "react";
import { Form, Row, Col, Select, Input, Button } from "antd";
//import { useState } from "react";

const { Option } = Select;

function onSearch(val) {
  console.log("search:", val);
}

const DepositForm = ({
  children,
  deposit = {},
  onFinish = () => {},
  onFinishFailed = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  const handleOnFinish = (data) => {
    onFinish({
      ...data,
    });
  };

  return (
    <Form
      initialValues={deposit}
      onFinish={handleOnFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Row gutter={24}>
        <Col md={8} sm={24} xs={24}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "El número de tarjeta es requerido",
              },
              { min: 16, max: 16, message: "" },
              {
                pattern: "^[0-9]{1,16}$",
                message: "El número de tarjeta consta de 16 números",
              },
            ]}
            label="Número de tarjeta destino"
            name="account"
            hasFeedback
          >
            <Input
              maxLength="16"
              placeholder="Número de tarjeta destino"
            ></Input>
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "El monto es requerido",
              },
              {
                pattern: "^[0-9]+([.][0-9]{1,2})?$",
                message:
                  "El valor debe ser numérico y puede tener dos decimales",
              },
            ]}
            label="Cantidad a depositar"
            name="ammount"
            hasFeedback
          >
            <Input type="number" placeholder="Cantidad a depositar"></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}></Row>
      {children}
    </Form>
  );
};

export default DepositForm;
