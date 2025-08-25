import React, { Component } from "react";
import axios from "axios";

class LendLoanPage extends Component {
  state = {
    customer_id: "",
    loan_amount: "",
    loan_period_years: "",
    interest_rate_yearly: "",
    total_amount_payable: null,
    monthly_emi: null,
    loan_id: "",
    successMessage: "",
    errorMessage: "",
  };

  handleChange = (e) => {
    this.setState(
      { [e.target.name]: e.target.value, successMessage: "", errorMessage: "" },
      this.calculateEMI
    );
  };

  calculateEMI = () => {
    const { loan_amount, interest_rate_yearly, loan_period_years } = this.state;
    const P = parseFloat(loan_amount);
    const R = parseFloat(interest_rate_yearly);
    const N = parseFloat(loan_period_years);

    if (!isNaN(P) && !isNaN(R) && !isNaN(N)) {
      const total_interest = P * N * (R / 100);
      const A = P + total_interest;
      const monthly_emi = A / (N * 12);
      this.setState({
        total_amount_payable: A.toFixed(2),
        monthly_emi: monthly_emi.toFixed(2),
      });
    } else {
      this.setState({ total_amount_payable: null, monthly_emi: null });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      customer_id,
      loan_amount,
      loan_period_years,
      interest_rate_yearly,
    } = this.state;
    try {
      const res = await axios.post(
        `https://agetwareassignmentmain.onrender.com/api/v1/loans`,
        {
          customer_id,
          loan_amount: parseFloat(loan_amount),
          loan_period_years: parseInt(loan_period_years),
          interest_rate_yearly: parseFloat(interest_rate_yearly),
        }
      );

      this.setState({
        loan_id: res.data.loan_id,
        successMessage: "Loan created successfully!",
        errorMessage: "",
        customer_id: "",
        loan_amount: "",
        loan_period_years: "",
        interest_rate_yearly: "",
      });
    } catch (err) {
      this.setState({
        errorMessage: err.response?.data?.error || "Something went wrong",
        successMessage: "",
      });
    }
  };

  render() {
    const {
      customer_id,
      loan_amount,
      loan_period_years,
      interest_rate_yearly,
      total_amount_payable,
      monthly_emi,
      successMessage,
      errorMessage,
      loan_id,
    } = this.state;

    return (
      <div className="flex justify-center items-center min-w-full h-[100vh]">
        <div className="max-w-xl mx-auto  bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-green-700">
            Create New Loan
          </h2>

          <form onSubmit={this.handleSubmit} className="space-y-4">
            <input
              type="text"
              name="customer_id"
              placeholder="Customer ID"
              value={customer_id}
              onChange={this.handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />

            <input
              type="number"
              name="loan_amount"
              placeholder="Loan Amount"
              value={loan_amount}
              onChange={this.handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />

            <input
              type="number"
              name="interest_rate_yearly"
              placeholder="Interest Rate (%)"
              value={interest_rate_yearly}
              onChange={this.handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />

            <input
              type="number"
              name="loan_period_years"
              placeholder="Loan Period (Years)"
              value={loan_period_years}
              onChange={this.handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />

            {total_amount_payable && monthly_emi && (
              <div className="bg-gray-100 p-4 rounded text-sm">
                <p>Total Payable: ₹{total_amount_payable}</p>
                <p>Monthly EMI: ₹{monthly_emi}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Create Loan
            </button>
          </form>

          {successMessage && (
            <div className="mt-4 text-green-600 text-center">
              {successMessage} <br />
              Loan ID: <strong>{loan_id}</strong>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 text-red-600 text-center">{errorMessage}</div>
          )}
        </div>
      </div>
    );
  }
}

export default LendLoanPage;
