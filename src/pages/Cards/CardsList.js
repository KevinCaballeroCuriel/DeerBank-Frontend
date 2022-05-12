import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TableSearch from "../../components/web-components/TableSearch";
import { Card, Modal, Tag, Input } from "antd";
import {
  FormOutlined,
  DeleteOutlined,
  BarsOutlined,
  PlusCircleOutlined,
  EyeOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import mastercard from "../../assets/images/mastercard-logo.png";
import { errorModalAlert } from "../../utils/ModalAlert";
import CardsHook from "../../hooks/CardsHook";
import AccountsHook from "../../hooks/AccountsHook";
import moment from "moment";

const CardsList = () => {
  const { getColumnSearchProps, createTable } = TableSearch();
  const {
    getCardsList,
    getCardDetails,
    mapCards,
    deleteCard,
    updateCardPin,
    updateCardExpDate,
  } = CardsHook();
  const { getAccountDetails } = AccountsHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPinVisible, setIsModalPinVisible] = useState(false);
  const [editPinButtonVisible, setEditPinButtonVisible] = useState(true);
  const [cards, setCards] = useState([]);
  const [cardSelected, setCardSelected] = useState(-1);
  const [cardPin, setCardPin] = useState("999");
  const [newCardPin, setNewCardPin] = useState(null);
  const [cardInfo, setCardInfo] = useState({
    id: null,
    number: "",
    exp_date: "",
    pin: "",
    cvv: "",
    account: null,
  });
  const [cardName, setCardName] = useState("");

  const showModal = (id) => {
    setIsModalVisible(true);
    setCardSelected(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOkPin = () => {
    setIsModalPinVisible(false);
    editPin();
  };

  const editPin = async () => {
    await updateCardPin(cardSelected, newCardPin);
    setNewCardPin(null);
  };

  const handleCancelPin = () => {
    setIsModalPinVisible(false);
    Modal.info({ title: "Acción cancelada" });
    setNewCardPin(null);
  };

  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await getCardsList();
        setCards(mapCards(data));
      }
      fetchData();
    } catch (error) {
      errorModalAlert("Error al momento de obtener la lista de tarjetas");
    }
  }, []);

  const columns = [
    {
      title: "Número",
      dataIndex: "number",
      key: "number",
      sorter: (a, b) => a.number.localeCompare(b.number),
      ...getColumnSearchProps("number"),
    },
    {
      title: "Vencimiento",
      dataIndex: "exp_date",
      key: "exp_date",
      sorter: (a, b) => a.exp_date.localeCompare(b.exp_date),
      ...getColumnSearchProps("exp_date"),
    },
  ];

  function showModalEditPin(id) {
    setIsModalPinVisible(true);
    setCardSelected(id);
  }

  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await getCardDetails(cardSelected);
        setCardPin(data.pin);
        setCardInfo({
          ...cardInfo,
          id: data.id,
          number: data.number,
          exp_date: data.exp_date,
          pin: data.pin,
          cvv: data.cvv,
          account: data.account,
        });
      }
      if (cardSelected !== -1) {
        fetchData();
      }
    } catch (error) {
      errorModalAlert("Error al momento de obtener el pin");
    }
  }, [cardSelected]);

  useEffect(() => {
    try {
      async function fetchDataAccount() {
        const { data } = await getAccountDetails(cardInfo.account);

        setCardName(data.client.name);
      }
      if (cardInfo.account !== null) {
        fetchDataAccount();
      }
    } catch (error) {
      errorModalAlert("Error al momento de obtener el pin");
    }
  }, [cardInfo]);

  function showEditCardConfirm(id) {
    Modal.confirm({
      title:
        "Estas apunto de actualizar el vencimiento de una tarjeta, ¿Desea continuar?",
      okText: "Si",
      okType: "danger",
      autoFocusButton: null,
      okButtonProps: { type: "primary" },
      cancelText: "No",
      async onOk() {
        async function fetchData() {
          const { data } = await getCardsList();
          setCards(mapCards(data));
        }
        await updateCardExpDate(
          id,
          moment().add(3, "years").format("YYYY-MM-DD")
        );
        fetchData();
      },
      onCancel() {
        Modal.info({ title: "Acción cancelada" });
      },
    });
  }

  function showDeleteCardConfirm(id) {
    Modal.confirm({
      title: "Estas apunto de eliminar una tarjeta, ¿Desea continuar?",
      okText: "Si",
      okType: "danger",
      autoFocusButton: null,
      okButtonProps: { type: "primary" },
      cancelText: "No",
      async onOk() {
        async function fetchData() {
          const { data } = await getCardsList();
          setCards(mapCards(data));
        }
        await deleteCard(id);
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
        <h1>Lista de Tarjetas</h1>
      </div>
      {createTable(columns, cards, {
        expandedRowRender: (record) => {
          return (
            <div className="ml-5">
              <button
                type="button"
                className="btn btn-warning m-1"
                onClick={() => showModal(record.id)}
              >
                Ver Tarjeta
                <EyeOutlined className="ml-1 mb-1 align-middle" />
              </button>
              <button
                type="button"
                className="btn btn-info m-1"
                onClick={() => showModalEditPin(record.id)}
              >
                Cambiar PIN
                <FormOutlined className="ml-1 mb-1 align-middle" />
              </button>
              <button
                type="button"
                className="btn btn-secondary m-1"
                onClick={() => showEditCardConfirm(record.id)}
              >
                Actualizar Vencimiento{" "}
                <RedoOutlined className="ml-1 mb-1 align-middle" />
              </button>
              <button
                type="button"
                className="btn btn-danger m-1"
                onClick={() => showDeleteCardConfirm(record.id)}
              >
                Eliminar <DeleteOutlined className="ml-1 mb-1 align-middle" />
              </button>
            </div>
          );
        },
      })}
      <Modal
        title={<h4>Tarjeta</h4>}
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
          {cardInfo === null ||
          cardInfo.number === undefined ||
          cardInfo.cvv === undefined ||
          cardInfo.exp_date === undefined ? (
            <h5 className="card-number text-center">Sin asignar</h5>
          ) : (
            <>
              <h5 className="card-number text-center">
                {cardInfo.number.replace(/\d{4}(?=.)/g, "$& ")}
              </h5>

              <div className="card-footer">
                <div className="mr-30">
                  <p>Nombre</p>
                  <h6>{cardName}</h6>
                </div>
                <div className="mr-30">
                  <p>Expiración</p>
                  <h6>{moment(cardInfo.exp_date).format("MM/YY")}</h6>
                </div>
                <div className="mr-30">
                  <p>CVV</p>
                  <h6>{cardInfo.cvv}</h6>
                </div>
                <div className="card-footer-col col-logo ml-auto">
                  <img src={mastercard} alt="mastercard" />
                </div>
              </div>
            </>
          )}
        </Card>
      </Modal>
      <Modal
        title={<h4>Cambiar PIN</h4>}
        width={300}
        visible={isModalPinVisible}
        onOk={handleOkPin}
        onCancel={handleCancelPin}
        footer={[
          <button
            type="button"
            id="btnEditPinCancel"
            className="btn btn-secondary m-1"
            onClick={handleCancelPin}
          >
            Cancelar
          </button>,
          <button
            type="button"
            id="btnEditPinOk"
            className="btn btn-primary m-1"
            disabled={editPinButtonVisible}
            onClick={handleOkPin}
          >
            Cambiar
          </button>,
        ]}
      >
        <div>
          <span>Escriba el nuevo PIN</span>
          <br />
          <Input
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 4);
              e.target.value >= 1000
                ? setEditPinButtonVisible(false)
                : setEditPinButtonVisible(true);
            }}
            placeholder={cardPin}
            value={newCardPin}
            type="number"
            min="1000"
            name="newPin"
            id="newPin"
            onChange={(e) => setNewCardPin(e.target.value.toString())}
          ></Input>
        </div>
      </Modal>
    </Card>
  );
};

export default CardsList;
