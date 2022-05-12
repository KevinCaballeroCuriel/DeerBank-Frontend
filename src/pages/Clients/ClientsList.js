import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TableSearch from "../../components/web-components/TableSearch";
import { Card, Modal, Tag } from "antd";
import { errorModalAlert } from "../../utils/ModalAlert";
import {
  FormOutlined,
  DeleteOutlined,
  BarsOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import ClientsHook from "../../hooks/ClientsHook";
import { useHistory } from "react-router-dom";

const ClientsList = () => {
  const { getColumnSearchProps, createTable } = TableSearch();
  const { getClientsList, mapClients, deleteClient } = ClientsHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clients, setClients] = useState([]);
  const [clientDetails, setClientDetails] = useState({});
  const [type, setType] = useState("");
  const history = useHistory();

  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await getClientsList();
        setClients(mapClients(data));
      }

      setType(localStorage.getItem("loginType"));

      fetchData();
    } catch (error) {
      errorModalAlert("Error al momento de obtener la lista de clientes");
    }
  }, []);

  const showModal = (id) => {
    setIsModalVisible(true);
    const clientInfo = clients.find((client) => client.id === id);
    setClientDetails(clientInfo);
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
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "RFC",
      dataIndex: "rfc",
      key: "rfc",
      sorter: (a, b) => a.rfc.localeCompare(b.rfc),
      ...getColumnSearchProps("rfc"),
    },
    {
      title: "# de cliente",
      dataIndex: "number",
      key: "number",
      sorter: { compare: (a, b) => (a.number > b.number ? 1 : -1) },
      ...getColumnSearchProps("number"),
    },
    {
      title: "Tipo",
      dataIndex: "client_type",
      key: "client_type",
      sorter: (a, b) => a.client_type.localeCompare(b.client_type),
      ...getColumnSearchProps("client_type"),
    },
  ];

  function showDeleteClientConfirm(id) {
    Modal.confirm({
      title: "Estas apunto de eliminar un cliente, ¿Desea continuar?",
      okText: "Si",
      okType: "danger",
      autoFocusButton: null,
      okButtonProps: { type: "primary" },
      cancelText: "No",
      async onOk() {
        async function fetchData() {
          const { data } = await getClientsList();
          setClients(mapClients(data));
        }
        await deleteClient(id);
        fetchData();
      },
      onCancel() {
        Modal.info({ title: "Acción cancelada" });
      },
    });
  }

  useEffect(() => {
    if (
      (type === "Persona Física" || type === "Persona Moral") &&
      clients !== null
    ) {
      const clientInfo = clients.find((client) => client.id > 0);
      history.push(`/client-details/${clientInfo.id}`);
    }
  }, [clients]);

  return (
    <Card bodyStyle={{ overflow: "auto" }}>
      <div>
        <h1>Lista de Clientes</h1>
      </div>
      {createTable(columns, clients, {
        expandedRowRender: (record) => {
          return (
            <div className="ml-5">
              <Link
                className="btn btn-success m-1"
                to={`/client-edit/${record.id}`}
              >
                Editar <FormOutlined className="ml-1 mb-1 align-middle" />
              </Link>
              <Link
                className="btn btn-info m-1"
                to={`/client-details/${record.id}`}
              >
                Detalle <BarsOutlined className="ml-1 mb-1 align-middle" />
              </Link>
              <button
                type="button"
                className="btn btn-warning m-1"
                onClick={() => showModal(record.id)}
              >
                Info
                <PlusCircleOutlined className="ml-1 mb-1 align-middle" />
              </button>
              <button
                type="button"
                className="btn btn-danger m-1"
                onClick={() => showDeleteClientConfirm(record.id)}
              >
                Eliminar <DeleteOutlined className="ml-1 mb-1 align-middle" />
              </button>
            </div>
          );
        },
      })}
      <Modal
        title={<h4>Información del Cliente</h4>}
        bodyStyle={{ height: 400 }}
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
        <h4>Cliente</h4>
        <p>
          <b>Número:</b> {clientDetails.number}
        </p>
        <p>
          <b>Nombre:</b> {clientDetails.name}
        </p>
        <p>
          <b>Email:</b> {clientDetails.email}
        </p>
        <p>
          <b>RFC:</b> {clientDetails.rfc}
        </p>
        <p>
          <b>Dirección:</b> {clientDetails.address}
        </p>
        <p>
          <b>Ciudad:</b> {clientDetails.place}
        </p>
        <p>
          <b>Código Postal:</b> {clientDetails.zip_code}
        </p>
        <p>
          <b>Tipo:</b> {clientDetails.client_type}
        </p>
      </Modal>
    </Card>
  );
};

export default ClientsList;
