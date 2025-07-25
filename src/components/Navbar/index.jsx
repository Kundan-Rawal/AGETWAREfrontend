import { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-700 w-full p-3 flex items-center justify-between flex-wrap  fixernew">
      <div className="flex items-center">
        <img
          src="/white-green.d3a4a6b6698b604eb1026e4a9331fc5b.svg"
          className="logoimage"
          alt="Logo"
        />
      </div>

      <button
        className="text-white text-2xl sm:hidden"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      <ul
        className={`${
          menuOpen ? "block" : "hidden"
        } sm:flex space-y-2 sm:space-y-0 sm:space-x-4 text-white font-normal w-full sm:w-auto mt-4 sm:mt-0 transition-all duration-300 ease-in-out`}
      >
        <Link to="/loans">
          <li className="hover:text-green-400 cursor-pointer px-3 ">
            Lend Loan
          </li>
        </Link>
        <Link to="/loans/payments">
          <li className="hover:text-green-400 cursor-pointer px-3">
            Record Payment
          </li>
        </Link>
        <Link to="/loans/ledger">
          <li className="hover:text-green-400 cursor-pointer px-3">
            Get Loan Details
          </li>
        </Link>
        <Link to="/customer/overview">
          <li className="hover:text-green-400 cursor-pointer px-3">
            Customer Loans
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
