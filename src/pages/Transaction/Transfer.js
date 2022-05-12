import React, { useState } from "react";
import { Button, Card, Tabs } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { errorModalAlert, successModalAlert } from "../../utils/ModalAlert";
import TransferForm from "./TransferForm";
import TransactionsHook from "../../hooks/TransactionsHook";
import { useHistory } from "react-router-dom";

const Transfer = () => {
  const [loading, setLoading] = useState(false);
  const { transferTransaction } = TransactionsHook();
  const history = useHistory();

  function callback(key) {
    console.log(key);
  }

  const transfer = async (data) => {
    try {
      setLoading(true);
      data["ammount"] = Number(data.ammount);
      const result = await transferTransaction(data);
      if (result){
        history.push("/transactions");
      }
    } catch (err) {
      errorModalAlert("Error al momento de realizar la transferencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2>Realizar Transferencia</h2>
      <TransferForm
        onFinish={transfer}
        onFinishFailed={() => errorModalAlert("Verifique los datos ingresados")}
      >
        <Button
          loading={loading}
          className="btn btn-warning m-1"
          icon={<AppstoreAddOutlined className="ml-1 mb-1 align-middle" />}
          type="primary"
          htmlType="submit"
        >
          Transferir
        </Button>
      </TransferForm>
    </Card>
  );
};

export default Transfer;
