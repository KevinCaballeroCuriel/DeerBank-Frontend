import React, { useState } from "react";
import { Form, Row, Col, Select, Input, Button, DatePicker } from "antd";
import moment from "moment";
//import { useState } from "react";

const AccountStatusForm = ({
  children,
  accountStatus = {},
  onFinish = () => {},
  onFinishFailed = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  const handleOnFinish = (data) => {
    onFinish({
      ...data,
    });
  };

  const { RangePicker } = DatePicker;

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current >= moment().endOf("day");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <Form
      initialValues={accountStatus}
      onFinish={handleOnFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Row gutter={24}>
        <Col md={12} sm={24} xs={24}>
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
            label="Número de tarjeta"
            name="number"
            hasFeedback
          >
            <Input maxLength="16" placeholder="Número de tarjeta"></Input>
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item label="Rango de fechas" name="range_date">
            <RangePicker
              size="large"
              format="YYYY-MM-DD"
              placeholder={["Fecha inicial", "Fecha final"]}
              className="rounded-lg"
              disabledDate={disabledDate}
            />
          </Form.Item>
        </Col>
      </Row>
      {children}
    </Form>
  );
};

export default AccountStatusForm;
