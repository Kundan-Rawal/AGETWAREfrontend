import { useState } from "react";

const AccountOverviewPage = () => {
  const [customerId, setCustomerId] = useState("");
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchOverview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOverview(null);
    setError("");

    try {
      const response = await fetch(
        `https://agetwareassignmentmain.onrender.com/api/v1/customers/${customerId}/overview`
      );

      if (!response.ok) {
        throw new Error("Customer not found or has no loans.");
      }

      const data = await response.json();
      setOverview(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col justify-center items-center pt-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow-md scrollbar-width-none">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Account Overview
        </h1>

        <form onSubmit={handleFetchOverview} className="mb-6">
          <label
            htmlFor="customerId"
            className="block text-green-800 font-semibold mb-2"
          >
            Enter Customer ID:
          </label>
          <input
            type="text"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Fetch Overview
          </button>
        </form>

        {loading && <p className="text-center text-green-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
      </div>

      {overview && (
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Loans for Customer ID:{" "}
            <span className="text-black">{overview.customer_id}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded-xl text-center">
              <p className="text-md font-medium">Total Loans</p>
              <p className="text-xl font-bold">{overview.total_loans}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-green-200 max-w-full scroll-auto">
              <thead className="bg-green-200 text-green-800">
                <tr>
                  <th className="py-2 px-4 text-left">Loan ID</th>
                  <th className="py-2 px-4 text-left">Principal (₹)</th>
                  <th className="py-2 px-4 text-left">Interest (₹)</th>
                  <th className="py-2 px-4 text-left">Total (₹)</th>
                  <th className="py-2 px-4 text-left">EMI (₹)</th>
                </tr>
              </thead>
              <tbody>
                {overview.loans.map((loan) => (
                  <tr
                    key={loan.loan_id}
                    className="border-b border-green-100 hover:bg-green-50"
                  >
                    <td className="py-2 px-4">{loan.loan_id}</td>
                    <td className="py-2 px-4">{loan.principal_amount}</td>
                    <td className="py-2 px-4">
                      {(
                        parseFloat(loan.total_amount) -
                        parseFloat(loan.principal_amount)
                      ).toFixed(2)}
                    </td>
                    <td className="py-2 px-4">
                      {parseFloat(loan.total_amount).toFixed(2)}
                    </td>
                    <td className="py-2 px-4">
                      {parseFloat(loan.monthly_emi).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountOverviewPage;
