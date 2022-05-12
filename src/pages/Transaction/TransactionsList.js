import React, { useState, useEffect } from "react";
import TableSearch from "../../components/web-components/TableSearch";
import { Card, Modal, Tag } from "antd";
import {
  FormOutlined,
  DeleteOutlined,
  BarsOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import get from "lodash.get";
import { errorModalAlert } from "../../utils/ModalAlert";
import TransactionsHook from "../../hooks/TransactionsHook";
import moment from "moment";

const TransactionsList = () => {
  const { getColumnSearchProps, createTable } = TableSearch();
  const { getTransactionsList, mapTransactions } = TransactionsHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState({
    account: [],
  });

  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await getTransactionsList();
        setTransactions(mapTransactions(data));
      }
      fetchData();
    } catch (error) {
      errorModalAlert("Error al momento de obtener la lista de transacciones");
    }
  }, []);

  const showModal = (id) => {
    setIsModalVisible(true);
    setTransactionDetails(
      transactions.find((transaction) => transaction.id === id)
    );
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Fecha",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: { compare: (a, b) => (a.timestamp > b.timestamp ? 1 : -1) },
      ...getColumnSearchProps("timestamp"),
      render(value) {
        return <>{moment(value).format("YYYY/MM/DD HH:mm:ss.SSS")}</>;
      },
    },
    {
      title: "Cuenta",
      dataIndex: ["account", "number"],
      key: "number",
      sorter: {
        compare: (a, b) =>
          get(a, ["account", "number"]) > get(b, ["account", "number"])
            ? 1
            : -1,
      },
      ...getColumnSearchProps(["account", "number"]),
    },
    {
      title: "Tipo",
      dataIndex: "transaction_type",
      key: "transaction_type",
      sorter: {
        compare: (a, b) => (a.transaction_type > b.transaction_type ? 1 : -1),
      },
      ...getColumnSearchProps("transaction_type"),
    },
    {
      title: "Cantidad",
      dataIndex: "ammount",
      key: "ammount",
      sorter: {
        compare: (a, b) =>
          parseInt(a.ammount, 10) > parseInt(b.ammount, 10) ? 1 : -1,
      },
      ...getColumnSearchProps("ammount"),
      render(value) {
        return <>${value}</>;
      },
    },
    {
      title: "Concepto",
      dataIndex: "concept",
      key: "concept",
      sorter: { compare: (a, b) => (a.concept > b.concept ? 1 : -1) },
      ...getColumnSearchProps("concept"),
    },
    {
      title: "# de Autorización",
      dataIndex: "auth_number",
      key: "auth_number",
      sorter: { compare: (a, b) => (a.auth_number > b.auth_number ? 1 : -1) },
      ...getColumnSearchProps("auth_number"),
    },
    {
      title: "Estatus",
      dataIndex: "status",
      key: "status",
      sorter: { compare: (a, b) => (a.status > b.status ? 1 : -1) },
      ///...getColumnSearchProps("status"),
      render(value) {
        return (
          <div className="text-center">
            <Tag
              color={
                value === "En Proceso" || value === "Programada"
                  ? "blue"
                  : value === "Completada"
                  ? "green"
                  : "red"
              }
            >
              {value}
            </Tag>
          </div>
        );
      },
    },
  ];

  return (
    <Card bodyStyle={{ overflow: "auto" }}>
      <div>
        <h1>Lista de Transacciones</h1>
      </div>
      {createTable(columns, transactions, {
        expandedRowRender: (record) => {
          return (
            <div className="ml-5">
              <button
                type="button"
                onClick={() => showModal(record.id)}
                className="btn btn-info m-1"
              >
                Detalle <BarsOutlined className="ml-1 mb-1 align-middle" />
              </button>
            </div>
          );
        },
      })}
      <Modal
        title={<h4>Detalle de transacción</h4>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            type="button"
            className="btn btn-primary m-1"
            onClick={handleOk}
          >
            OK
          </button>,
        ]}
      >
        <h4>Transacción</h4>
        <p>
          <b>Fecha y hora:</b> {transactionDetails.timestamp}
        </p>
        <p>
          <b>Número de cuenta:</b> {transactionDetails.account.number}
        </p>
        <p>
          <b>Tipo:</b> {transactionDetails.transaction_type}
        </p>
        <p>
          <b>Cantidad:</b> ${transactionDetails.ammount}
        </p>
        <p>
          <b>Concepto:</b> {transactionDetails.concept}
        </p>
        <p>
          <b>Estatus:</b> {transactionDetails.status}
        </p>
        <p>
          <b>Número de Autorización:</b> {transactionDetails.auth_number}
        </p>
      </Modal>
    </Card>
  );
};

export default TransactionsList;
