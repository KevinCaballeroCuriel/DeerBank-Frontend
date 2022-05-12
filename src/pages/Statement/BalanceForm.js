import React from "react";
import { Select, Input, Form , Row, Col} from "antd";


const BalanceForm = () => ({
  children,
  onFinish = () => {},
  onFinishFailed = () => {},
  }) => {
  const handleOnFinish = (data) => {
    onFinish({
      ...data,
    });
  };
  const {Option} = Select;
  function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onSearch(val) {
    console.log("search:", val);
  }
  return (
    <Form
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
            ]}
            label="Número de tarjeta"
            name="number"
            hasFeedback
          >
            <Select
              showSearch
              size="large"
              placeholder="Seleccciona el número de tarjeta"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0 ||
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 
              }
            >
                <Option value="1">1234567891234567</Option>
                <Option value="2">1425365478962315</Option>
              
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {children}
    </Form>
  );
};
export default BalanceForm;