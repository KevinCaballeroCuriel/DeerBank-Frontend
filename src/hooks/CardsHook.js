import { useCallback, useState } from "react";
import { http } from "../services/HttpService";
import { Modal } from "antd";

const ICard = {
  key: null,
  id: null,
  number: "",
  exp_date: "",
  pin: "",
  cvv: "",
  account: null,
};

const CardsHook = () => {
  const [card, setCard] = useState(ICard);

  const mapCards = useCallback((obj) => {
    const result = obj.map((card) => {
      const { id } = card;

      return {
        ...card,
        key: id,
      };
    });
    return result;
  }, []);

  const getCardDetails = async (id) => {
    try {
      const cardDetails = await http.get(`/cards/${id}/`);
      setCard(cardDetails.data);
      setCardDetails(cardDetails.data);
      return cardDetails;
    } catch (error) {
      Modal.error({
        title: `No se ha podido obtener la informacion de la tarjeta`,
        content: `${error.response.data.message}`,
      });
    }
  };

  const setCardDetails = (data) => {
    setCard({
      ...card,
      key: data.id,
    });
  };

  const createCard = (data) => {
    try {
      return http.post("/cards/", data);
    } catch (error) {
      Modal.error({
        title: `No se ha podido crear la tarjeta`,
        content: `${error.response.data.message}`,
      });
    } finally {
      Modal.success({
        title: "Se ha creado la tarjeta con exito!",
        onOk() {},
        onCancel() {},
      });
    }
  };

  const deleteCard = async (id) => {
    try {
      await http.delete(`/cards/${id}/`);
    } catch (error) {
      Modal.error({
        title: `No se ha podido eliminar la tarjeta`,
        content: `${error.response.data.message}`,
      });
    } finally {
      Modal.success({
        title: "Se ha eliminado la tarjeta con exito!",
      });
    }
  };

  const updateCardPin = async (id, pin) => {
    try {
      return http.patch(`/cards/${id}/`, { pin: pin });
    } catch (error) {
      Modal.error({
        title: `No se ha podido modificar el pin de la tarjeta`,
        content: `${error.response.data.message}`,
      });
    } finally {
      setCard(ICard);
      Modal.success({
        title: "Se ha actualizado el pin de la tarjeta con exito!",
      });
    }
  };

  const updateCardExpDate = async (id, exp_date) => {
    try {
      return http.patch(`/cards/${id}/`, { exp_date: exp_date });
    } catch (error) {
      Modal.error({
        title: `No se ha podido modificar el pin de la tarjeta`,
        content: `${error.response.data.message}`,
      });
    } finally {
      setCard(ICard);
      Modal.success({
        title: "Se ha actualizado el pin de la tarjeta con exito!",
      });
    }
  };

  const getCardsList = async () => {
    return await http.get("/cards/");
  };

  return {
    card,
    setCard,
    mapCards,
    createCard,
    deleteCard,
    updateCardPin,
    updateCardExpDate,
    getCardsList,
    getCardDetails,
  };
};

export default CardsHook;
