/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  TeamOutlined,
  UserOutlined,
  IdcardFilled,
  CreditCardFilled,
  IdcardOutlined,
  DollarCircleFilled,
  UnorderedListOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const [type, setType] = useState("");

  useEffect(() => {
    setType(localStorage.getItem("loginType"));
  }, []);

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>DeerBank</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {(type === "Persona Moral" || type === "Persona Física") && (
          <>
            <Menu.Item className="menu-item-header" key="99">
              Cliente
            </Menu.Item>
            <Menu.Item key="100">
              <NavLink to="/clients">
                <span
                  className="icon"
                  style={{
                    background: page === "clients" ? color : "",
                  }}
                >
                  {profile}
                </span>
                <span className="label">Mi Información</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="101">
              <NavLink to="/statement">
                <span
                  className="icon"
                  style={{
                    background: page === "statement" ? color : "",
                  }}
                >
                  <SolutionOutlined />
                </span>
                <span className="label">Estado de Cuenta</span>
              </NavLink>
            </Menu.Item>
          </>
        )}
        {type === "Ejecutivo" && (
          <>
            <Menu.Item className="menu-item-header" key="1">
              Clientes
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/clients">
                <span
                  className="icon"
                  style={{
                    background: page === "clients" ? color : "",
                  }}
                >
                  <TeamOutlined />
                </span>
                <span className="label">Lista de Clientes</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/client-create">
                <span
                  className="icon"
                  style={{
                    background: page === "client-create" ? color : "",
                  }}
                >
                  {profile}
                </span>
                <span className="label">Registrar Cliente</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item className="menu-item-header" key="4">
              Cuentas
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/accounts">
                <span
                  className="icon"
                  style={{
                    background: page === "accounts" ? color : "",
                  }}
                >
                  <IdcardFilled />
                </span>
                <span className="label">Lista de Cuentas</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/account-create">
                <span
                  className="icon"
                  style={{
                    background: page === "account-create" ? color : "",
                  }}
                >
                  <IdcardFilled />
                </span>
                <span className="label">Crear Cuenta</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item className="menu-item-header" key="7">
              Tarjetas
            </Menu.Item>
            <Menu.Item key="8">
              <NavLink to="/cards">
                <span
                  className="icon"
                  style={{
                    background: page === "cards" ? color : "",
                  }}
                >
                  <CreditCardFilled />
                </span>
                <span className="label">Lista de Tarjetas</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="9">
              <NavLink to="/card-create">
                <span
                  className="icon"
                  style={{
                    background: page === "card-create" ? color : "",
                  }}
                >
                  <CreditCardFilled />
                </span>
                <span className="label">Crear Tarjeta</span>
              </NavLink>
            </Menu.Item>
          </>
        )}
        {(type === "Cajero" ||
          type === "Persona Moral" ||
          type === "Persona Física") && (
          <>
            <Menu.Item className="menu-item-header" key="10">
              Transacciones
            </Menu.Item>
            <Menu.Item key="11">
              <NavLink to="/transactions">
                <span
                  className="icon"
                  style={{
                    background: page === "transactions" ? color : "",
                  }}
                >
                  <UnorderedListOutlined />
                </span>
                <span className="label">Lista de transacciones</span>
              </NavLink>
            </Menu.Item>
          </>
        )}
        {(type === "Persona Moral" || type === "Persona Física") && (
          <>
            <Menu.Item key="13">
              <NavLink to="/transfer">
                <span
                  className="icon"
                  style={{
                    background: page === "transfer" ? color : "",
                  }}
                >
                  <DollarCircleFilled />
                </span>
                <span className="label">Realizar Transferencia</span>
              </NavLink>
            </Menu.Item>
          </>
        )}
        {type === "Cajero" && (
          <>
            <Menu.Item key="14">
              <NavLink to="/transaction">
                <span
                  className="icon"
                  style={{
                    background: page === "transaction" ? color : "",
                  }}
                >
                  <DollarCircleFilled />
                </span>
                <span className="label">Realizar Transacción</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item className="menu-item-header" key="200">
              Cliente
            </Menu.Item>
            <Menu.Item key="201">
              <NavLink to="/statement">
                <span
                  className="icon"
                  style={{
                    background: page === "statement" ? color : "",
                  }}
                >
                  <SolutionOutlined />
                </span>
                <span className="label">Estado de Cuenta</span>
              </NavLink>
            </Menu.Item>
          </>
        )}

        {/*
        <Menu.Item className="menu-item-header" key="10">
          Demo Pages
        </Menu.Item>
        <Menu.Item key="12">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="13">
          <NavLink to="/tables">
            <span
              className="icon"
              style={{
                background: page === "tables" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Tables</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="14">
          <NavLink to="/billing">
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {billing}
            </span>
            <span className="label">Billing</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="5">
          Account Pages
        </Menu.Item>
        <Menu.Item key="15">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="16">
          <NavLink to="/sign-in">
            <span className="icon">{signin}</span>
            <span className="label">Sign In</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="17">
          <NavLink to="/sign-up">
            <span className="icon">{signup}</span>
            <span className="label">Sign Up</span>
          </NavLink>
        </Menu.Item>*/}
      </Menu>
    </>
  );
}

export default Sidenav;
