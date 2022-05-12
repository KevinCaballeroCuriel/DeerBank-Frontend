import React, { useState } from "react";
import { Form, Row, Col, Select, Input, Button } from "antd";

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log("search:", val);
}

const WithdrawForm = ({
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
      <Row gutter={[24, 0]}>
        <Col span={24} md={8} sm={24} xs={24}>
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
            label="Número de tarjeta origen"
            name="account"
            hasFeedback
          >
            <Input
              maxLength="16"
              placeholder="Número de tarjeta origen"
            ></Input>
          </Form.Item>
        </Col>

        <Col span={24} md={6} sm={24} xs={24}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "La fecha de expiración es requerida",
              },

              {
                pattern: "^[0-9]{2,2}/[0-9]{2,2}$",
                message: "El formato de fecha es mm/aa",
              },
            ]}
            label="Fecha de expiración de tarjeta origen"
            name="exp_date"
            hasFeedback
          >
            <Input
              maxLength="5"
              placeholder="Fecha de espiración de tarjeta origen"
            ></Input>
          </Form.Item>
        </Col>
        <Col span={24} md={4} sm={24} xs={24}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "El CVV es requerido",
              },
              { min: 3, max: 3, message: "" },
              {
                pattern: "^[0-9]{1,3}$",
                message: "CVV consta de 3 números",
              },
            ]}
            label="CVV de tarjeta origen"
            name="cvv"
            hasFeedback
          >
            <Input.Password
              maxLength="3"
              className="rounded-lg"
              size="small"
              placeholder="CVV de tarjeta origen"
            ></Input.Password>
          </Form.Item>
        </Col>
        <Col span={24} md={4} sm={24} xs={24}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "El PIN es requerido",
              },
              { min: 4, max: 4, message: "" },
              {
                pattern: "^[0-9]{1,4}$",
                message: "PIN consta de 4 números",
              },
            ]}
            label="PIN de tarjeta origen"
            name="pin"
            hasFeedback
          >
            <Input.Password
              maxLength="4"
              className="rounded-lg"
              size="small"
              placeholder="PIN de tarjeta origen"
            ></Input.Password>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24} md={8} sm={24} xs={24}>
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
            label="Cantidad a retirar"
            name="ammount"
            hasFeedback
          >
            <Input type="number" placeholder="Cantidad a retirar"></Input>
          </Form.Item>
        </Col>
      </Row>
      {children}
    </Form>
  );
};

export default WithdrawForm;
