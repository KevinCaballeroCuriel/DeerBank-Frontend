import React, { useState, useEffect } from "react";
import { Form, Row, Col, Select, Input } from "antd";
import AccountsHook from "../../hooks/AccountsHook";
import { errorModalAlert } from "../../utils/ModalAlert";

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log("search:", val);
}

const NewCardForm = ({
  children,
  account = {},
  onFinish = () => {},
  onFinishFailed = () => {},
}) => {
  const handleOnFinish = (data) => {
    onFinish({
      ...data,
    });
  };
  const { getAccountsList, mapAccounts } = AccountsHook();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    try {
      async function fetchAccountsData() {
        const { data } = await getAccountsList();
        setAccounts(mapAccounts(data));
      }
      fetchAccountsData();
    } catch (error) {
      errorModalAlert("Error al momento de obtener la lista de clientes");
    }
  }, []);

  return (
    <Form
      initialValues={account}
      onFinish={handleOnFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Row gutter={24}>
        <Col md={12}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "La cuenta es requerida",
              },
            ]}
            label="Cuenta"
            name="account_id"
            hasFeedback
          >
            <Select
              showSearch
              size="large"
              placeholder="Seleccciona la cuenta"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0 ||
                option.value.toString().indexOf(input.toLowerCase()) >= 0 ||
                option.number.toString().indexOf(input.toLowerCase()) >= 0
              }
            >
              {accounts.map((account) => (
                <Option value={account.id} number={account.number}>
                  {account.client.name} - {account.number}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "El PIN es requerido",
              },
              { min: 4, max: 4, message: "" },
              {
                pattern: "^[0-9]{1,4}$",
                message: "El PIN consta de 4 números",
              },
            ]}
            label="PIN"
            name="pin"
            hasFeedback
          >
            <Input maxLength="4" placeholder="PIN"></Input>
          </Form.Item>
        </Col>
      </Row>
      {children}
    </Form>
  );
};

export default NewCardForm;
