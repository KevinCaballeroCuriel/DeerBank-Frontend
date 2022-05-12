import { useCallback, useState } from "react";
import { http } from "../services/HttpService";
import { Button, Modal } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";

const ITransaction = {
  key: null,
  id: null,
  account: {
    id: null,
    number: "",
  },
  transaction_type: "",
  status: "",
  concept: "",
  timestamp: "",
  ammount: "",
  auth_number: "",
};

const TransactionsHook = () => {
  const [transaction, setTransaction] = useState(ITransaction);

  const mapTransactions = useCallback((obj) => {
    const result = obj.map((transaction) => {
      const { id } = transaction;

      return {
        ...transaction,
        key: id,
      };
    });
    return result;
  }, []);

  const getTransactionDetails = async (id) => {
    try {
      const transactionDetails = await http.get(`/transactions/${id}/`);
      setTransaction(transactionDetails.data);
      return transactionDetails;
    } catch (error) {
      Modal.error({
        title: `No se ha podido obtener la informacion de la transacción]`,
        content: `${error.response.data.message}`,
      });
    }
  };

  const depositTransaction = async (data) => {
    try {
      const transferData = await http.post("/deposit/", data);
      Modal.success({
        title: "Se ha depositado a la cuenta con exito!",
        bodyStyle: { paddingRight: 30 },
        content: (
          <center>
            <a
              key="link"
              href={transferData.data.receipt}
              target="_blank"
              className="btn btn-warning mr-10"
            >
              Comprobante{" "}
              <FileDoneOutlined className="ml-1 mb-1 align-middle" />
            </a>
          </center>
        ),
        onOk() {},
        onCancel() {},
      });
      return true;
    } catch (error) {
      Modal.error({
        title: `No se ha podido depositar a la cuenta`,
        content: `${error.response.data.msg}`,
      });
      return false;
    }
  };

  const withdrawTransaction = async (data) => {
    try {
      const transferData = await http.post("/withdraw/", data);
      Modal.success({
        title: "Se ha retirado el monto de la cuenta con exito!",
        bodyStyle: { paddingRight: 30 },
        content: (
          <center>
            <a
              key="link"
              href={transferData.data.receipt}
              target="_blank"
              className="btn btn-warning mr-10"
            >
              Comprobante{" "}
              <FileDoneOutlined className="ml-1 mb-1 align-middle" />
            </a>
          </center>
        ),
        onOk() {},
        onCancel() {},
      });
      return true;
    } catch (error) {
      Modal.error({
        title: `No se ha podido retirar el monto de la cuenta`,
        content: `${error.response.data.msg}`,
      });
      return false;
    }
  };

  const transferTransaction = async (data) => {
    try {
      const transferData = await http.post("/transfer/", data);
      Modal.success({
        title: "Se ha realizado la transferencia con exito!",
        bodyStyle: { paddingRight: 30 },
        content: (
          <center>
            <a
              key="link"
              href={transferData.data.receipt}
              target="_blank"
              className="btn btn-warning mr-10"
            >
              Comprobante{" "}
              <FileDoneOutlined className="ml-1 mb-1 align-middle" />
            </a>
          </center>
        ),
        onOk() {},
        onCancel() {},
      });
      return true;
    } catch (error) {
      Modal.error({
        title: `No se ha podido transferir el monto a la cuenta`,
        content: `${error.response.data.msg}`,
      });
      return false;
    }
  };

  const getTransactionsList = async () => {
    return await http.get("/transactions/");
  };

  return {
    transaction,
    setTransaction,
    mapTransactions,
    depositTransaction,
    withdrawTransaction,
    transferTransaction,
    getTransactionsList,
    getTransactionDetails,
  };
};

export default TransactionsHook;
