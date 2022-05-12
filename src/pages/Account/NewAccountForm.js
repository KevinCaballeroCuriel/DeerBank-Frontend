import React, { useState, useEffect } from "react";
import { Form, Row, Col, Select } from "antd";
import ClientsHook from "../../hooks/ClientsHook";
import BranchesHook from "../../hooks/BranchesHook";
import { errorModalAlert } from "../../utils/ModalAlert";

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log("search:", val);
}

const NewAccountForm = ({
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
  const { getClientsList, mapClients } = ClientsHook();
  const { getBranchesList } = BranchesHook();
  const [clients, setClients] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    try {
      async function fetchClientsData() {
        const { data } = await getClientsList();
        setClients(mapClients(data));
      }
      async function fetchBranchesData() {
        const { data } = await getBranchesList();
        setBranches(data);
      }
      fetchClientsData();
      fetchBranchesData();
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
                message: "El cliente es requerido",
              },
            ]}
            label="Cliente"
            name="client_id"
            hasFeedback
          >
            <Select
              showSearch
              size="large"
              placeholder="Seleccciona al cliente"
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
              {clients.map((client) => (
                <Option value={client.id} number={client.number}>
                  {client.name}
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
                message: "La sucursal es requerida",
              },
            ]}
            label="Sucursal"
            name="branch_id"
            hasFeedback
          >
            <Select
              showSearch
              size="large"
              placeholder="Seleccciona la sucursal"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0 || option.value.indexOf(input) >= 0
              }
            >
              {branches.map((branch) => (
                <Option value={branch.id}>{branch.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {children}
    </Form>
  );
};

export default NewAccountForm;
