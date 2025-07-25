import "./index.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homebackground">
      <div className="home-overlay">
        <h1 className="text-4xl font-bold text-center text-green-600">
          Welcome to the Banking Loan Management System
        </h1>
        <p className="text-center mt-4 text-white">
          Select from the available options .
        </p>
        <div className="w-full flex justify-center align-center flex-wrap">
          <Link to="/loans">
            <button className="homebutton">Lend A Loan</button>
          </Link>
          <Link to="/loans/payments">
            <button className="homebutton">Record Payment</button>
          </Link>
          <Link to="/loans/ledger">
            <button className="homebutton">Get Loan Details</button>
          </Link>
          <Link to="/customer/overview">
            <button className="homebutton">Customer Loans</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
