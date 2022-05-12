import { useCallback, useState } from "react";
import { http } from "../services/HttpService";
import { Modal } from "antd";

const IClient = {
  key: null,
  id: null,
  number: "",
  name: "",
  email: "",
  password: "",
  rfc: "",
  address: "",
  place: "",
  zip_code: "",
  client_type: "",
  accounts: [
    {
      branch: [],
      card: [],
    },
  ],
};

const ClientsHook = () => {
  const [client, setClient] = useState(IClient);

  const mapClients = useCallback((obj) => {
    const result = obj.map((client) => {
      const { id } = client;

      return {
        ...client,
        key: id,
      };
    });
    return result;
  }, []);

  const getClientDetails = async (id) => {
    try {
      const clientDetails = await http.get(`/clients/${id}/`);
      setClientDetails(clientDetails.data);
      return clientDetails;
    } catch (error) {
      Modal.error({
        title: `No se ha podido obtener la informacion del cliente`,
        content: `${error.response.data.message}`,
      });
    }
  };

  const setClientDetails = (data) => {
    setClient({
      ...client,
      key: data.id,
    });
  };

  const createClient = (data) => {
    try {
      return http.post("/clients/", data);
    } catch (error) {
      Modal.error({
        title: `No se ha podido registrar al cliente`,
        content: `${error.response.data.message}`,
      });
    } finally {
      Modal.success({
        title: "Se ha registrado el cliente con exito!",
        onOk() {},
        onCancel() {},
      });
    }
  };

  const deleteClient = async (id) => {
    try {
      await http.delete(`/clients/${id}/`);
    } catch (error) {
      Modal.error({
        title: `No se ha podido eliminar al cliente`,
        content: `${error.response.data.message}`,
      });
    } finally {
      Modal.success({
        title: "Se ha eliminado el cliente con exito!",
      });
    }
  };

  const updateClient = async (data, id) => {
    try {
      console.log(data);
      return http.patch(`/clients/${id}/`, data);
    } catch (error) {
      Modal.error({
        title: `No se ha podido modificar al cliente`,
        content: `${error.response.data.message}`,
      });
    } finally {
      setClient(IClient);
    }
  };

  const getClientsList = async () => {
    return await http.get("/clients/");
  };

  return {
    client,
    setClient,
    mapClients,
    createClient,
    deleteClient,
    updateClient,
    getClientsList,
    getClientDetails,
  };
};

export default ClientsHook;
