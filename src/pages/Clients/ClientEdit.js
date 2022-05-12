import React, { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import EditClientForm from "./EditClientForm";
import { errorModalAlert, successModalAlert } from "../../utils/ModalAlert";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ClientsHook from "../../hooks/ClientsHook";
import Loading from "../../components/web-components/Loading";

const ClientEdit = () => {
  const [loading, setLoading] = useState(false);
  const { client, setClient, getClientDetails, updateClient } = ClientsHook();
  let { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getClientDetails(id);

        setClient({ ...data });
      } catch (error) {
        errorModalAlert(
          "El cliente no existe o hubo un problema al consultarlo"
        );
        history.push("/clients");
      }
    };

    fetchData();
  }, [id]);

  const editClient = async (data) => {
    try {
      setLoading(true);
      await updateClient(data, id);
    } catch (err) {
      errorModalAlert("Error al momento de modificar al cliente");
    } finally {
      setLoading(false);
      successModalAlert("Se ha modificado el cliente con exito!");
      history.push("/clients");
    }
  };

  if (client.id == null) {
    return <Loading />;
  }

  return (
    <Card>
      <h2>Modificar Cliente</h2>
      <EditClientForm
        onFinish={editClient}
        client={client}
        onFinishFailed={() => errorModalAlert("Verifique los datos ingresados")}
      >
        <Button
          loading={loading}
          className="btn btn-warning m-1"
          icon={<AppstoreAddOutlined className="ml-1 mb-1 align-middle" />}
          type="primary"
          htmlType="submit"
        >
          Modificar
        </Button>
      </EditClientForm>
    </Card>
  );
};

export default ClientEdit;
