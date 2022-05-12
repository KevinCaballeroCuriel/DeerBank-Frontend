import React, { useState } from "react";
import { Button, Card, Tabs } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { errorModalAlert, successModalAlert } from "../../utils/ModalAlert";
import TransferForm from "./TransferForm";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";
import TransactionsHook from "../../hooks/TransactionsHook";
import { useHistory } from "react-router-dom";

const Transaction = () => {
  const [loading, setLoading] = useState(false);
  const { depositTransaction, transferTransaction, withdrawTransaction } =
    TransactionsHook();
  const history = useHistory();
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const transfer = async (data) => {
    try {
      setLoading(true);
      data["ammount"] = Number(data.ammount);
      const result = await transferTransaction(data);
      if (result === true) {
        history.push("/transactions");
      }
    } catch (err) {
      errorModalAlert("Error al momento de realizar la transferencia");
    } finally {
      setLoading(false);
    }
  };

  const deposit = async (data) => {
    try {
      setLoading(true);
      data["ammount"] = Number(data.ammount);
      const result = await depositTransaction(data);
      if (result === true) {
        history.push("/transactions");
      }
    } catch (err) {
      errorModalAlert("Error al momento de realizar el depósito");
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (data) => {
    try {
      setLoading(true);
      data["ammount"] = Number(data.ammount);
      const result = await withdrawTransaction(data);
      if (result === true) {
        history.push("/transactions");
      }
    } catch (err) {
      errorModalAlert("Error al momento de realizar el retiro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2>Realizar Transacción</h2>
      <Tabs
        style={{ paddingLeft: 15, paddingRight: 15 }}
        defaultActiveKey="1"
        onChange={callback}
      >
        <TabPane tab="Depósito" key="1">
          <DepositForm
            onFinish={deposit}
            onFinishFailed={() =>
              errorModalAlert("Verifique los datos ingresados")
            }
          >
            <Button
              loading={loading}
              className="btn btn-warning m-1"
              icon={<AppstoreAddOutlined className="ml-1 mb-1 align-middle" />}
              type="primary"
              htmlType="submit"
            >
              Depositar
            </Button>
          </DepositForm>
        </TabPane>
        <TabPane tab="Retiro" key="2">
          <WithdrawForm
            onFinish={withdraw}
            onFinishFailed={() =>
              errorModalAlert("Verifique los datos ingresados")
            }
          >
            <Button
              loading={loading}
              className="btn btn-warning m-1"
              icon={<AppstoreAddOutlined className="ml-1 mb-1 align-middle" />}
              type="primary"
              htmlType="submit"
            >
              Retirar
            </Button>
          </WithdrawForm>
        </TabPane>
        <TabPane tab="Transferencia" key="3">
          <TransferForm
            onFinish={transfer}
            onFinishFailed={() =>
              errorModalAlert("Verifique los datos ingresados")
            }
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
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Transaction;
