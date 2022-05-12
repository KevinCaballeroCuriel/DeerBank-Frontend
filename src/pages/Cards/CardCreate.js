import React, { useState } from "react";
import { Button, Card } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import NewCardForm from "./NewCardForm";
import { errorModalAlert, successModalAlert } from "../../utils/ModalAlert";
import CardsHook from "../../hooks/CardsHook";
import { useHistory } from "react-router-dom";

const CardCreate = () => {
  const [loading, setLoading] = useState(false);
  const { createCard } = CardsHook();
  const history = useHistory();

  const createNewCard = async (data) => {
    try {
      setLoading(true);
      await createCard(data);
    } catch (err) {
      errorModalAlert("Error al momento de crear la tarjeta");
    } finally {
      setLoading(false);
      history.push("/cards");
    }
  };

  return (
    <Card>
      <h1>Crear Tarjeta</h1>
      <NewCardForm
        onFinish={createNewCard}
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
      </NewCardForm>
    </Card>
  );
};

export default CardCreate;
