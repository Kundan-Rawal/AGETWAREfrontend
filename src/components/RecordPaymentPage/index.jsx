import React, { Component } from "react";
import axios from "axios";

class RecordPaymentPage extends Component {
  state = {
    loan_id: "",
    amount: "",
    payment_type: "EMI",
    response: null,
    error: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: "",
      response: null,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { loan_id, amount, payment_type } = this.state;

    try {
      const res = await axios.post(
        `https://agetwareassignment-production.up.railway.app/api/v1/loans/${loan_id}/payments`,
        {
          amount: parseFloat(amount),
          payment_type,
        }
      );

      this.setState({
        response: res.data,
        error: "",
        loan_id: "",
        amount: "",
        payment_type: "EMI",
      });
    } catch (err) {
      this.setState({
        error: err.response?.data?.error || "Something went wrong",
        response: null,
      });
    }
  };

  render() {
    const { loan_id, amount, payment_type, response, error } = this.state;

    return (
      <div className="flex justify-center items-center h-lvh">
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-green-700">
            Record a Loan Payment
          </h2>

          <form onSubmit={this.handleSubmit} className="space-y-4">
            <input
              type="text"
              name="loan_id"
              placeholder="Loan ID"
              value={loan_id}
              onChange={this.handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />

            <input
              type="number"
              name="amount"
              placeholder="Payment Amount"
              value={amount}
              onChange={this.handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />

            <select
              name="payment_type"
              value={payment_type}
              onChange={this.handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="EMI">EMI</option>
              <option value="LUMP_SUM">Lump Sum</option>
            </select>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Record Payment
            </button>
          </form>

          {response && (
            <div className="mt-6 bg-green-50 border border-green-300 text-green-800 p-4 rounded shadow">
              <h3 className="font-semibold text-lg mb-2">
                ✅ Payment Recorded
              </h3>
              <p>
                <strong>Payment ID:</strong> {response.payment_id}
              </p>
              <p>
                <strong>Loan ID:</strong> {response.loan_id}
              </p>
              <p>
                <strong>Remaining Balance:</strong> ₹
                {response.remaining_balance}
              </p>
              <p>
                <strong>EMIs Left:</strong> {response.emis_left}
              </p>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-100 text-red-700 p-4 rounded border border-red-300">
              ❌ {error}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RecordPaymentPage;
