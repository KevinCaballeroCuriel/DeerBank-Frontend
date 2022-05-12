import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Select,
  Input,
  Button,
  Switch,
  DatePicker,
} from "antd";
import moment from "moment";
import { AppstoreAddOutlined } from "@ant-design/icons";
//import { useState } from "react";

const TransferForm = ({
  children,
  deposit = {},
  onFinish = () => {},
  onFinishFailed = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const handleOnFinish = (data) => {
    onFinish({
      ...data,
    });
  };

  function onChange(value) {
    console.log(`selected ${value}`);
    setIsSwitchChecked(value);
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  return (
    <Form
      initialValues={deposit}
      onFinish={handleOnFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
        name="remember"
        className="aligin-center"
        valuePropName="checked"
      >
        <span className="mr-10">¿Desea programar la transacción?</span>{" "}
        <Switch onChange={onChange} />
      </Form.Item>
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
            label="Número de tarjeta origen"
            name="origin_account"
            hasFeedback
          >
            <Input
              maxLength="16"
              placeholder="Número de tarjeta origen"
            ></Input>
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24}>
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
        <Col md={6} sm={24} xs={24}>
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
      </Row>
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
            label="Número de tarjeta Destino"
            name="destiny_account"
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
            label="Cantidad a transferir"
            name="ammount"
            hasFeedback
          >
            <Input type="number" placeholder="Cantidad a transferir"></Input>
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "El concepto de transacción es requerido",
              },
            ]}
            label="Concepto de transacción"
            name="concept"
            hasFeedback
          >
            <Input placeholder="Concepto de transacción"></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        {isSwitchChecked && (
          <Col md={6} sm={24} xs={24}>
            <Form.Item label="Fecha a realizar la transacción" name="timestamp">
              <DatePicker
                size="large"
                className="rounded-lg"
                showNow={false}
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Seleccione la fecha"
                showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
      {children}
    </Form>
  );
};

export default TransferForm;
