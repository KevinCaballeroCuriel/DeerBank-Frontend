import React, { useState } from "react";
import { Button, Card } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import NewAccountForm from "./NewAccountForm";
import { errorModalAlert, successModalAlert } from "../../utils/ModalAlert";
import AccountsHook from "../../hooks/AccountsHook";
import { useHistory } from "react-router-dom";

const AccountCreate = () => {
  const [loading, setLoading] = useState(false);
  const { createAccount } = AccountsHook();
  const history = useHistory();

  const createNewAccount = async (data) => {
    try {
      setLoading(true);
      await createAccount(data);
    } catch (err) {
      errorModalAlert("Error al momento de registrar la cuenta");
    } finally {
      setLoading(false);
      history.push("/accounts");
    }
  };

  return (
    <Card>
      <h1>Crear Cuenta</h1>
      <NewAccountForm
        onFinish={createNewAccount}
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
      </NewAccountForm>
    </Card>
  );
};

export default AccountCreate;
