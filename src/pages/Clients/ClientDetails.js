import React, { useState, useEffect, useCallback } from "react";
import TableSearch from "../../components/web-components/TableSearch";
import { Card, Modal, Tag, Col, Row } from "antd";
import {
  FormOutlined,
  DeleteOutlined,
  BarsOutlined,
  RedoOutlined,
  BankOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import mastercard from "../../assets/images/mastercard-logo.png";
import get from "lodash.get";
import ClientsHook from "../../hooks/ClientsHook";
import Loading from "../../components/web-components/Loading";
import { errorModalAlert, successModalAlert } from "../../utils/ModalAlert";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import moment from "moment";

const ClientDetails = () => {
  const { getColumnSearchProps, createTable } = TableSearch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCardVisible, setIsModalCardVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountDetails, setAccountDetails] = useState({
    card: [],
    branch: [],
  });
  const { client, setClient, getClientDetails } = ClientsHook();
  let { id } = useParams();
  const history = useHistory();

  const mapAccounts = useCallback((obj) => {
    const result = obj.map((account) => {
      const { id } = account;

      return {
        ...account,
        key: id,
      };
    });
    return result;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getClientDetails(id);

        setClient({ ...data });

        if (data.accounts !== undefined) {
          setAccounts(mapAccounts(data.accounts));
        }
      } catch (error) {
        history.push("/clients");
      }
    };

    fetchData();
  }, [id]);

  if (client.id == null) {
    return <Loading />;
  }

  const showModal = (id) => {
    setIsModalVisible(true);
    setAccountDetails(accounts.find((account) => account.id === id));
  };

  const showModalCard = (id) => {
    setIsModalCardVisible(true);
    setAccountDetails(accounts.find((account) => account.id === id));
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsModalCardVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalCardVisible(false);
  };

  const columns = [
    {
      title: "Número",
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
      title: "Dinero",
      dataIndex: "money",
      key: "money",
      sorter: { compare: (a, b) => (a.money > b.money ? 1 : -1) },
      ...getColumnSearchProps("money"),
      render(value) {
        return <>${value}</>;
      },
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

  function showEditAccountConfirm(id) {
    Modal.confirm({
      title:
        "Estas apunto de cambiar el estatus de una cuenta, ¿Desea continuar?",
      okText: "Si",
      okType: "danger",
      autoFocusButton: null,
      okButtonProps: { type: "primary" },
      cancelText: "No",
      async onOk() {
        console.log("EDIT");
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
        console.log("DELETE");
      },
      onCancel() {
        Modal.info({ title: "Acción cancelada" });
      },
    });
  }

  return (
    <>
      <div>
        <h1>Detalles del Cliente</h1>
      </div>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h4 className="font-semibold m-0">Información</h4>}
          >
            <p>
              <b>Número de cliente:</b> {client.number}
            </p>
            <p>
              <b>Nombre:</b> {client.name}
            </p>
            <p>
              <b>Email:</b> {client.email}
            </p>
            <p>
              <b>RFC:</b> {client.rfc}
            </p>
            <p>
              <b>Dirección:</b> {client.address}
            </p>
            <p>
              <b>Ciudad:</b> {client.place}
            </p>
            <p>
              <b>Código Postal:</b> {client.zip_code}
            </p>
            <p>
              <b>Tipo:</b> {client.client_type}
            </p>
          </Card>
        </Col>
        <Col span={24} md={18} className="mb-24">
          <Card
            bordered={false}
            title={<h4 className="font-semibold m-0">Cuentas</h4>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16, overflow: "auto" }}
          >
            {createTable(columns, accounts, {
              expandedRowRender: (record) => {
                return (
                  <div className="ml-5">
                    <button
                      type="button"
                      onClick={() => showModalCard(record.id)}
                      className="btn btn-info m-1"
                    >
                      Tarjeta
                      <CreditCardOutlined className="ml-1 mb-1 align-middle" />
                    </button>
                    <button
                      type="button"
                      onClick={() => showModal(record.id)}
                      className="btn btn-warning m-1"
                    >
                      Sucursal
                      <BankOutlined className="ml-1 mb-1 align-middle" />
                    </button>
                  </div>
                );
              },
            })}
          </Card>
        </Col>
      </Row>

      <Modal
        title={<h4>Información de sucursal</h4>}
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
        <p>
          <b>Número de cuenta del cliente:</b> {accountDetails.number}
        </p>
        <p>
          <b>Número de sucursal:</b> {accountDetails.branch.number}
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

      <Modal
        title={<h4>Tarjeta asociada</h4>}
        visible={isModalCardVisible}
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
        <Card
          title={
            <div className="brand">
              <img src={logo} width="50" height="50" alt="" />
              <span>
                <b>DeerBank</b>
              </span>
            </div>
          }
          bordered={false}
          className="card-credit header-solid h-ful rounded-lg"
        >
          {accountDetails.card === null ||
          accountDetails.card.number === undefined ||
          accountDetails.card.cvv === undefined ||
          accountDetails.card.exp_date === undefined ? (
            <h5 className="card-number text-center">Sin asignar</h5>
          ) : (
            <>
              <h5 className="card-number text-center">
                {accountDetails.card.number.replace(/\d{4}(?=.)/g, "$& ")}
              </h5>

              <div className="card-footer">
                <div className="mr-30">
                  <p>Nombre</p>
                  <h6>{client.name}</h6>
                </div>
                <div className="mr-30">
                  <p>Expiración</p>
                  <h6>
                    {moment(accountDetails.card.exp_date).format("MM/YY")}
                  </h6>
                </div>
                <div className="mr-30">
                  <p>CVV</p>
                  <h6>{accountDetails.card.cvv}</h6>
                </div>
                <div className="card-footer-col col-logo ml-auto">
                  <img src={mastercard} alt="mastercard" />
                </div>
              </div>
            </>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default ClientDetails;
