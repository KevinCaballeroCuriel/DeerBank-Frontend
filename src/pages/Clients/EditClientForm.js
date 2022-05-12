import React from "react";
import { Form, Row, Col, Select, Input } from "antd";

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log("search:", val);
}

const EditClientForm = ({
  children,
  client = {},
  onFinish = () => {},
  onFinishFailed = () => {},
}) => {
  const handleOnFinish = (data) => {
    onFinish({
      ...data,
    });
  };

  return (
    <Form
      initialValues={client}
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
                // prettier-ignore
                pattern: "^[a-zA-Z]{3}(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                message: "Los datos del nombre son incorrectos",
              },
            ]}
            label="Nombre Completo"
            name="name"
            hasFeedback
          >
            <Input placeholder="Nombre completo"></Input>
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
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
            hasFeedback
          >
            <Input placeholder="correo@deerland.com"></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "El tipo de cliente es requerido",
              },
            ]}
            label="Tipo de Cliente"
            name="client_type"
            hasFeedback
          >
            <Select
              showSearch
              size="large"
              placeholder="Seleccciona el tipo de Cliente"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0 ||
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Persona Física">Persona Física</Option>
              <Option value="Persona Moral">Persona Moral</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            rules={[
              {
                required: true,
                // prettier-ignore
                pattern: "^[a-zA-Z0-9]{10,13}$",
                message: "Los datos del RFC son incorrectos",
              },
            ]}
            label="RFC"
            name="rfc"
            hasFeedback
          >
            <Input maxLength="13" placeholder="RFC"></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "La dirección es requerida",
              },
            ]}
            label="Dirección"
            name="address"
            hasFeedback
          >
            <Input maxLength="100" placeholder="Dirección"></Input>
          </Form.Item>
        </Col>
        <Col md={6} sm={12} xs={12}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "La ciudad es requerida",
              },
            ]}
            label="Ciudad"
            name="place"
            hasFeedback
          >
            <Input placeholder="Ciudad"></Input>
          </Form.Item>
        </Col>
        <Col md={6} sm={12} xs={12}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "El código postal es requerido",
              },
              { min: 5, max: 5, message: "" },
              {
                pattern: "^[0-9]{1,5}$",
                message: "El código postal consta de 5 números",
              },
            ]}
            label="Código Postal"
            name="zip_code"
            hasFeedback
          >
            <Input maxLength="5" placeholder="Código Postal"></Input>
          </Form.Item>
        </Col>
      </Row>
      {children}
    </Form>
  );
};

export default EditClientForm;
