import React, { useState } from "react";
import { Button, Card } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { errorModalAlert, successModalAlert } from "../../utils/ModalAlert";
import BalanceForm from "./BalanceForm";

const Balance = () => {
  const [loading, setLoading] = useState(false);

  const createBalance = async (data) => {
    setLoading(true);
    try {
      console.log("try-catch");
      successModalAlert("Se ha consultado el saldo con éxito");
    } catch (err) {
      console.log(err);
      errorModalAlert("Error al momento de consultar el saldo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2>Consultar saldo</h2>
      <BalanceForm
        onFinish={createBalance}
        onFinishFailed={() => errorModalAlert("Verifique los datos ingresados")}
      >
        <Button
          loading={loading}
          className="btn btn-warning m-1"
          icon={<AppstoreAddOutlined className="ml-1 mb-1 align-middle" />}
          type="primary"
          htmlType="submit"
        >
          Consultar
        </Button>
      </BalanceForm>
      <div>
        <p>
          <b>Saldo:</b>
        </p>
      </div>
    </Card>
  );
};

export default Balance;
