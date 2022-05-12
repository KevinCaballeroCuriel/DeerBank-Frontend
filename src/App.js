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
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AccountsList from "./pages/Account/AccountsList";
import AccountCreate from "./pages/Account/AccountCreate";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import ClientsList from "./pages/Clients/ClientsList";
import ClientCreate from "./pages/Clients/ClientCreate";
import ClientEdit from "./pages/Clients/ClientEdit";
import TransactionsList from "./pages/Transaction/TransactionsList";
import ClientDetails from "./pages/Clients/ClientDetails";
import CardsList from "./pages/Cards/CardsList";
import CardCreate from "./pages/Cards/CardCreate";
import Transaction from "./pages/Transaction/Transaction";
import Transfer from "./pages/Transaction/Transfer";
import AccountStatus from "./pages/Statement/AccountStatus";
import Balance from "./pages/Statement/Balance";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/" exact component={SignIn} />
        <Main>
          <Route exact path="/home" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/accounts" component={AccountsList} />
          <Route exact path="/account-create" component={AccountCreate} />
          <Route exact path="/clients" component={ClientsList} />
          <Route exact path="/client-create" component={ClientCreate} />
          <Route exact path="/client-edit/:id" component={ClientEdit} />
          <Route exact path="/transactions" component={TransactionsList} />
          <Route exact path="/transaction" component={Transaction} />
          <Route exact path="/transfer" component={Transfer} />
          <Route exact path="/client-details/:id" component={ClientDetails} />
          <Route exact path="/cards" component={CardsList} />
          <Route exact path="/card-create" component={CardCreate} />
          <Route exact path="/statement" component={AccountStatus} />
          <Route exact path="/balance" component={Balance} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
