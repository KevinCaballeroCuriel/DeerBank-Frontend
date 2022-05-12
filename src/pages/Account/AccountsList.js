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
import AccountsHook from "../../hooks/AccountsHook";
import { errorModalAlert } from "../../utils/ModalAlert";

const AccountsList = () => {
  const { getColumnSearchProps, createTable } = TableSearch();
  const { getAccountsList, mapAccounts, deleteAccount, updateAccount } =
    AccountsHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountDetails, setAccountDetails] = useState({
    client: [],
    branch: [],
  });

  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await getAccountsList();
        setAccounts(mapAccounts(data));
      }
      fetchData();
    } catch (error) {
      errorModalAlert("Error al momento de obtener la lista de cuentas");
    }
  }, []);

  const showModal = (id) => {
    setIsModalVisible(true);
    setAccountDetails(accounts.find((account) => account.id === id));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: ["client", "name"],
      key: "name",
      sorter: {
        compare: (a, b) =>
          get(a, ["client", "name"]) > get(b, ["client", "name"]) ? 1 : -1,
      },
      ...getColumnSearchProps(["client", "name"]),
    },
    {
      title: "Email",
      dataIndex: ["client", "email"],
      key: "email",
      sorter: {
        compare: (a, b) =>
          get(a, ["client", "email"]) > get(b, ["client", "email"]) ? 1 : -1,
      },
      ...getColumnSearchProps(["client", "email"]),
    },
    {
      title: "RFC",
      dataIndex: ["client", "rfc"],
      key: "rfc",
      sorter: {
        compare: (a, b) =>
          get(a, ["client", "rfc"]) > get(b, ["client", "rfc"]) ? 1 : -1,
      },
      ...getColumnSearchProps(["client", "rfc"]),
    },
    {
      title: "Número de cuenta",
      dataIndex: "number",
      key: "number",
      sorter: { compare: (a, b) => (a.number > b.number ? 1 : -1) },
      ...getColumnSearchProps("number"),
    },
    {
      title: "Corte",
      dataIndex: "cutoff_date",
      key: "cutoff_date",
      sorter: { compare: (a, b) => (a.cutoff_date > b.cutoff_date ? 1 : -1) },
      ...getColumnSearchProps("cutoff_date"),
    },
    {
      title: "Estatus",
      dataIndex: "status",
      key: "status",
      sorter: { compare: (a, b) => (a.status > b.status ? 1 : -1) },
      render(value) {
        return (
          <div className="text-center">
            <Tag color={value == "Activa" ? "green" : "red"}>{value}</Tag>
          </div>
        );
      },
    },
  ];

  function showEditAccountConfirm(id, status) {
    Modal.confirm({
      title:
        "Estas apunto de cambiar el estatus de una cuenta, ¿Desea continuar?",
      okText: "Si",
      okType: "danger",
      autoFocusButton: null,
      okButtonProps: { type: "primary" },
      cancelText: "No",
      async onOk() {
        async function fetchData() {
          const { data } = await getAccountsList();
          setAccounts(mapAccounts(data));
        }
        let newStatus = "";
        status == "Activa" ? (newStatus = "Inactiva") : (newStatus = "Activa");
        await updateAccount(id, newStatus);
        fetchData();
      },
      onCancel() {
        Modal.info({ title: "Acción cancelada" });
      },
    });
  }

  function showDeleteAccountConfirm(id) {
    Modal.confirm({
      title: "Estas apunto de eliminar una cuenta, ¿Desea continuar?",
      okText: "Si",
      okType: "danger",
      autoFocusButton: null,
      okButtonProps: { type: "primary" },
      cancelText: "No",
      async onOk() {
        async function fetchData() {
          const { data } = await getAccountsList();
          setAccounts(mapAccounts(data));
        }
        await deleteAccount(id);
        fetchData();
      },
      onCancel() {
        Modal.info({ title: "Acción cancelada" });
      },
    });
  }

  return (
    <Card bodyStyle={{ overflow: "auto" }}>
      <div>
        <h1>Lista de Cuentas</h1>
      </div>
      {createTable(columns, accounts, {
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
              <button
                type="button"
                className="btn btn-secondary m-1"
                onClick={() => showEditAccountConfirm(record.id, record.status)}
              >
                Cambiar Estatus{" "}
                <RedoOutlined className="ml-1 mb-1 align-middle" />
              </button>
              <button
                type="button"
                className="btn btn-danger m-1"
                onClick={() => showDeleteAccountConfirm(record.id)}
              >
                Eliminar <DeleteOutlined className="ml-1 mb-1 align-middle" />
              </button>
            </div>
          );
        },
      })}
      <Modal
        title={<h4>Detalle de cuenta</h4>}
        bodyStyle={{ height: 400, overflowY: "scroll" }}
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
        <h4>Cuenta</h4>
        <p>
          <b>Número:</b> {accountDetails.number}
        </p>
        <p>
          <b>Fecha de corte:</b> {accountDetails.cutoff_date}
        </p>
        <p>
          <b>Dinero:</b> ${accountDetails.money}
        </p>
        <p>
          <b>Estatus:</b> {accountDetails.status}
        </p>
        <h4>Cliente</h4>
        <p>
          <b>Número:</b> {accountDetails.client.number}
        </p>
        <p>
          <b>Nombre:</b> {accountDetails.client.name}
        </p>
        <p>
          <b>Email:</b> {accountDetails.client.email}
        </p>
        <p>
          <b>RFC:</b> {accountDetails.client.rfc}
        </p>
        <p>
          <b>Dirección:</b> {accountDetails.client.address}
        </p>
        <p>
          <b>Lugar:</b> {accountDetails.client.place}
        </p>
        <p>
          <b>Codigo Postal:</b> {accountDetails.client.zip_code}
        </p>
        <p>
          <b>Tipo:</b> {accountDetails.client.type}
        </p>
        <h4>Sucursal</h4>
        <p>
          <b>Número:</b> {accountDetails.branch.number}
        </p>
        <p>
          <b>Nombre:</b> {accountDetails.branch.name}
        </p>
        <p>
          <b>Dirección:</b> {accountDetails.branch.address}
        </p>
        <p>
          <b>Lugar:</b> {accountDetails.branch.place}
        </p>
        <p>
          <b>Codigo Postal:</b> {accountDetails.branch.zip_code}
        </p>
      </Modal>
    </Card>
  );
};

export default AccountsList;
