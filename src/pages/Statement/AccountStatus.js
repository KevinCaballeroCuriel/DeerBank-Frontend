import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "antd";
import { AppstoreAddOutlined, FileDoneOutlined } from "@ant-design/icons";
import { errorModalAlert, successModalAlert } from "../../utils/ModalAlert";
import AccountStatusForm from "./AccountStatusForm";
import TableSearch from "../../components/web-components/TableSearch";
import StatementHook from "../../hooks/StatementHook";
import moment from "moment";

const AccountStatus = () => {
  const { getColumnSearchProps, createTable } = TableSearch();
  const { IStatement, mapMovements, getStatementDetails } = StatementHook();
  const [accountStatus, setAccountStatus] = useState(IStatement);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMovements(mapMovements(accountStatus["movements"]));
  }, [accountStatus]);

  const createAccountStatus = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      async function fetchData() {
        let dataStatement = null;
        if (values.range_date === undefined || values.range_date === null) {
          const { data } = await getStatementDetails(values.number);
          dataStatement = data;
        } else {
          const { data } = await getStatementDetails(
            values.number,
            moment(values.range_date[0]).format("YYYY-MM-DD"),
            moment(values.range_date[1]).format("YYYY-MM-DD")
          );
          dataStatement = data;
        }

        setAccountStatus(dataStatement);
      }
      fetchData();
    } catch (err) {
      errorModalAlert(
        "Error al momento de obtener la información del estado de cuenta"
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Fecha",
      dataIndex: ["date"],
      key: "date",
      sorter: { compare: (a, b) => (a.date > b.date ? 1 : -1) },
      ...getColumnSearchProps("date"),
    },
    {
      title: "# de autorización",
      dataIndex: ["auth_num"],
      key: "auth_num",
      sorter: { compare: (a, b) => (a.auth_num > b.auth_num ? 1 : -1) },
      ...getColumnSearchProps("auth_num"),
    },
    {
      title: "Concepto",
      dataIndex: ["concept"],
      key: "concept",
      sorter: { compare: (a, b) => (a.concept > b.concept ? 1 : -1) },
      ...getColumnSearchProps("concept"),
    },
    {
      title: "Depósito",
      dataIndex: "deposit",
      key: "deposit",
      sorter: { compare: (a, b) => (a.deposit > b.deposit ? 1 : -1) },
      ...getColumnSearchProps("deposit"),
    },
    {
      title: "Retiro",
      dataIndex: "withdrawal",
      key: "withdrawal",
      sorter: { compare: (a, b) => (a.withdrawal > b.withdrawal ? 1 : -1) },
      ...getColumnSearchProps("withdrawal"),
    },
    {
      title: "Saldo",
      dataIndex: "balance",
      key: "balance",
      sorter: { compare: (a, b) => (a.balance > b.balance ? 1 : -1) },
      ...getColumnSearchProps("balance"),
    },
  ];

  return (
    <>
      <div>
        <h1>Estado de cuenta</h1>
      </div>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6} className="mb-24 ">
          <Card
            className="header-solid h-full"
            title={<h4 className="font-bold m-0">Información</h4>}
          >
            <div>
              <h5 className="font-bold">General</h5>
              <p>
                <b>Cantidad total de depósitos:</b> ${accountStatus.deposits}
              </p>
              <p>
                <b>Cantidad total de retiros:</b> ${accountStatus.withdrawals}
              </p>
              <p>
                <b>Saldo final:</b> ${accountStatus.final_balance}
              </p>
              <p>
                <b>Saldo promedio:</b> ${accountStatus.avg_balance}
              </p>
              <h5 className="font-bold">Fechas</h5>
              <p>
                <b>Fecha de corte:</b> {accountStatus.cutoff_date}
              </p>
              <p>
                <b>Fecha de inicio: </b>
                {accountStatus.start_date}
              </p>
              <p>
                <b>Fecha de fin:</b> {accountStatus.end_date}
              </p>
              <h5 className="font-bold">Cliente</h5>
              <p>
                <b>Nombre del cliente:</b> {accountStatus.client.name}
              </p>
              <p>
                <b>Número de cliente:</b> {accountStatus.client.number}
              </p>
              <p>
                <b>Dirección:</b> {accountStatus.client.address}
              </p>
              <p>
                <b>Lugar:</b> {accountStatus.client.place}
              </p>
              <p>
                <b>Código postal:</b> {accountStatus.client.zip_code}
              </p>
              <p>
                <b>RFC:</b> {accountStatus.client.rfc}
              </p>
              <h5 className="font-bold">Sucursal</h5>
              <p>
                <b>Nombre:</b> {accountStatus.branch.name}
              </p>
              <p>
                <b>Número:</b> {accountStatus.branch.number}
              </p>
              <p>
                <b>Dirección:</b> {accountStatus.branch.address}
              </p>
              <p>
                <b>Lugar:</b> {accountStatus.branch.place}
              </p>
              <p>
                <b>Código postal:</b> {accountStatus.branch.zip_code}
              </p>
            </div>
          </Card>
        </Col>
        <Col span={24} md={18} className="mb-24">
          <Card>
            <h4 className="font-bold m-1 mb-4">Consultar estado de cuenta</h4>
            <AccountStatusForm
              onFinish={createAccountStatus}
              onFinishFailed={() =>
                errorModalAlert("Verifique los datos ingresados")
              }
            >
              <Button
                loading={loading}
                className="btn btn-warning m-1"
                icon={
                  <AppstoreAddOutlined className="ml-1 mb-1 align-middle" />
                }
                type="primary"
                htmlType="submit"
              >
                Consultar
              </Button>
            </AccountStatusForm>
          </Card>
          <Card
            bordered={false}
            title={
              <>
                <h4 className="font-semibold" style={{ display: "inline" }}>
                  Movimientos
                </h4>
                {accountStatus.file !== "" && (
                  <a
                    key="link"
                    href={accountStatus.file}
                    style={{ marginRight: 10, float: "right" }}
                    target="_blank"
                    className="btn btn-warning"
                  >
                    Descargar Estado de Cuenta{" "}
                    <FileDoneOutlined className="ml-1 mb-1 align-middle" />
                  </a>
                )}
              </>
            }
            className="header-solid mt-3"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16, overflow: "auto" }}
          >
            {createTable(columns, movements)}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AccountStatus;
