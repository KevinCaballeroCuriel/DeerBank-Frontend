import React, { useState } from "react";
import { Button, Card } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import NewClientForm from "./NewClientForm";
import { errorModalAlert, successModalAlert } from "../../utils/ModalAlert";
import ClientsHook from "../../hooks/ClientsHook";
import { useHistory } from "react-router-dom";

const ClientCreate = () => {
  const [loading, setLoading] = useState(false);
  const { createClient } = ClientsHook();
  const history = useHistory();

  const createNewClient = async (data) => {
    try {
      setLoading(true);
      await createClient(data);
    } catch (err) {
      errorModalAlert("Error al momento de registrar al cliente");
    } finally {
      setLoading(false);
      history.push("/clients");
    }
  };

  return (
    <Card>
      <h1>Registrar Cliente</h1>
      <NewClientForm
        onFinish={createNewClient}
        onFinishFailed={() => errorModalAlert("Verifique los datos ingresados")}
      >
        <Button
          loading={loading}
          className="btn btn-warning m-1"
          icon={<AppstoreAddOutlined className="ml-1 mb-1 align-middle" />}
          type="primary"
          htmlType="submit"
        >
          Registrar
        </Button>
      </NewClientForm>
    </Card>
  );
};

export default ClientCreate;
