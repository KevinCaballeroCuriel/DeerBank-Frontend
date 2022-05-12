import { useCallback, useState } from "react";
import { http } from "../services/HttpService";
import { Modal } from "antd";

const StatementHook = () => {
  const IStatement = {
    key: 0,
    id: null,
    file: "",
    client: {
      name: "",
      address: "",
      place: "",
      zip_code: "",
      number: "",
      rfc: "",
    },
    branch: {
      name: "",
      number: "",
      address: "",
      place: "",
      zip_code: "",
    },
    cutoff_date: "",
    start_date: "",
    end_date: "",
    prev_balance: 0,
    deposits: 0,
    withdrawals: 0,
    final_balance: 0,
    avg_balance: 0,
    movements: [
      {
        date: "",
        concept: "",
        auth_num: "",
        deposit: null,
        withdrawal: null,
        balance: null,
      },
    ],
  };

  const [statement, setStatement] = useState(IStatement);

  const mapMovements = useCallback((obj) => {
    const result = obj.map((movement) => {
      const { id } = movement;

      return {
        ...movement,
        key: id,
      };
    });
    return result;
  }, []);

  const getStatementDetails = async (
    number,
    start_date = "",
    end_date = ""
  ) => {
    try {
      const statementDetails = await http.get(
        `/statement/?number=${number}&start_date=${start_date}&end_date=${end_date}`
      );
      setStatement(statementDetails.data);
      return statementDetails;
    } catch (error) {
      Modal.error({
        title: `No se ha podido obtener la informacion del estado de cuenta`,
        content: `${error.response.data.message}`,
      });
    }
  };

  return {
    IStatement,
    statement,
    mapMovements,
    setStatement,
    getStatementDetails,
  };
};

export default StatementHook;
