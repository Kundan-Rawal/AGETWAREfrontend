import React, { Component } from "react";
import axios from "axios";

class LoanDetailsPage extends Component {
  state = {
    loan_id: "",
    data: null,
    error: "",
  };

  handleChange = (e) => {
    this.setState({ loan_id: e.target.value, error: "", data: null });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { loan_id } = this.state;

    try {
      const res = await axios.get(
        `https://agetwareassignmentmain.onrender.com/api/v1/loans/${loan_id}/ledger`
      );
      this.setState({ data: res.data, error: "" });
    } catch (err) {
      this.setState({
        error: err.response?.data?.error || "Unable to fetch loan details.",
        data: null,
      });
    }
  };

  render() {
    const { loan_id, data, error } = this.state;

    return (
      <div className="flex justify-center items-center h-lvh">
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            View Loan Details & Ledger
          </h2>

          <form onSubmit={this.handleSubmit} className="space-y-4">
            <input
              type="text"
              name="loan_id"
              placeholder="Enter Loan ID"
              value={loan_id}
              onChange={this.handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Fetch Loan Details
            </button>
          </form>

          {data && (
            <div className="mt-8 bg-green-50 border border-green-300 text-green-800 p-5 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">📄 Loan Summary</h3>
              <ul className="space-y-1 mb-4">
                <li>
                  <strong>Loan ID:</strong> {data.loan_id}
                </li>
                <li>
                  <strong>Customer ID:</strong> {data.customer_id}
                </li>
                <li>
                  <strong>Principal:</strong> ₹{data.principal}
                </li>
                <li>
                  <strong>Total Amount:</strong> ₹{data.total_amount}
                </li>
                <li>
                  <strong>Monthly EMI:</strong> ₹{data.monthly_emi}
                </li>
                <li>
                  <strong>Amount Paid:</strong> ₹{data.amount_paid}
                </li>
                <li>
                  <strong>Balance Amount:</strong> ₹{data.balance_amount}
                </li>
                <li>
                  <strong>EMIs Left:</strong> {data.emis_left}
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">
                💸 Transactions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-green-200">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="border border-green-200 p-2">
                        Transaction ID
                      </th>
                      <th className="border border-green-200 p-2">Date</th>
                      <th className="border border-green-200 p-2">
                        Amount (₹)
                      </th>
                      <th className="border border-green-200 p-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.transactions.map((tx) => (
                      <tr key={tx.payment_id}>
                        <td className="border border-green-200 p-2">
                          {tx.payment_id}
                        </td>
                        <td className="border border-green-200 p-2">
                          {new Date(tx.payment_date).toLocaleString()}
                        </td>
                        <td className="border border-green-200 p-2">
                          {tx.amount}
                        </td>
                        <td className="border border-green-200 p-2">
                          {tx.payment_type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

export default LoanDetailsPage;
