import { useCallback, useState } from "react";
import { http } from "../services/HttpService";
import { Modal } from "antd";

const IAccount = {
  key: null,
  id: null,
  client: {
    id: null,
    number: "",
    name: "",
    email: "",
    rfc: "",
    address: "",
    place: "",
    zip_code: "",
    client_type: "",
  },
  branch: {
    id: null,
    number: "",
    name: "",
    address: "",
    place: "",
    zip_code: "",
  },
  number: "",
  cutoff_date: "",
  money: "",
  status: "",
};

const AccountsHook = () => {
  const [account, setAccount] = useState(IAccount);

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

  const getAccountDetails = async (id) => {
    try {
      const accountDetails = await http.get(`/accounts/${id}/`);
      setAccount(accountDetails.data);
      setAccountDetails(accountDetails.data);
      return accountDetails;
    } catch (error) {
      Modal.error({
        title: `No se ha podido obtener la informacion de la cuenta`,
        content: `${error.response.data.message}`,
      });
    }
  };

  const setAccountDetails = (data) => {
    setAccount({
      ...account,
      key: data.id,
    });
  };

  const createAccount = (data) => {
    try {
      return http.post("/accounts/", data);
    } catch (error) {
      Modal.error({
        title: `No se ha podido crear la cuenta`,
        content: `${error.response.data.message}`,
      });
    } finally {
      Modal.success({
        title: "Se ha creado la cuenta con exito!",
        onOk() {},
        onCancel() {},
      });
    }
  };

  const deleteAccount = async (id) => {
    try {
      await http.delete(`/accounts/${id}/`);
    } catch (error) {
      Modal.error({
        title: `No se ha podido eliminar la cuenta`,
        content: `${error.response.data.message}`,
      });
    } finally {
      Modal.success({
        title: "Se ha eliminado la cuenta con exito!",
      });
    }
  };

  const updateAccount = async (id, status) => {
    try {
      return http.patch(`/accounts/${id}/`, { status: status });
    } catch (error) {
      Modal.error({
        title: `No se ha podido modificar la cuenta`,
        content: `${error.response.data.message}`,
      });
    } finally {
      setAccount(IAccount);
      Modal.success({
        title: "Se ha actualizado el estatus de la cuenta con exito!",
      });
    }
  };

  const getAccountsList = async () => {
    return await http.get("/accounts/");
  };

  return {
    account,
    setAccount,
    mapAccounts,
    createAccount,
    deleteAccount,
    updateAccount,
    getAccountsList,
    getAccountDetails,
  };
};

export default AccountsHook;
