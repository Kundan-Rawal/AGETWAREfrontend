import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import StateContext from "./StateContext";
import Navbar from "./components/Navbar";
import LendLoanPage from "./components/LendLoanPage";
import Home from "./components/Home";
import "./App.css";
import RecordPaymentPage from "./components/RecordPaymentPage";
import LoanDetailsPage from "./components/LoanDetailsPage";
import AccountOvrerviewPage from "./components/AccountOverviewPage";

class App extends Component {
  state = { activePage: "home" };

  setActivePage = (page) => {
    this.setState({ activePage: page });
  };

  render() {
    const { activePage } = this.state;
    return (
      <StateContext.Provider
        value={{ activePage, setActivePage: this.setActivePage }}
      >
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loans" element={<LendLoanPage />} />
            <Route path="/loans/payments" element={<RecordPaymentPage />} />
            <Route path="/loans/ledger" element={<LoanDetailsPage />} />
            <Route
              path="/customer/overview"
              element={<AccountOvrerviewPage />}
            />
          </Routes>
        </div>
      </StateContext.Provider>
    );
  }
}

export default App;
