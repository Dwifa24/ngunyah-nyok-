import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import logo from "../assets/images/logo.png";
import Swal from "sweetalert2";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-lilac to-cream h-auto">
      <div className="container flex py-3 mx-auto border-0 ">
        <div className="w-36 lg:h-1/3 flex justify-center items-center">
          <Link to="/user/home" className="text-xl text-white font-semibold">
            <img alt="" className="h-1/6" src={logo} />
          </Link>
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <input
            className="rounded  p-2 w-3/5"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button
            className="ml-1 p-3 rounded bg-white text-darkColor hover:bg-midColor hover:text-white"
            onClick={() => navigate(`/user/home/${query}`)}
          >
            <FaSearch />
          </button>
        </div>

        <div className="w-1/3 flex justify-center items-center">
          <div className="flex flex-col lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium text-lightColor">
            <Link
              to="/user/"
              className="inline-block rounded hover:text-white text-lg"
              aria-current="page"
            >
              Home
            </Link>

            <Link
              to="/user/orders"
              className="inline-block border-b  hover:text-white md:border-0 text-lg"
            >
              Orders
            </Link>

            <Link
              to="/user/profile"
              className="inline-block border-b  hover:text-white md:border-0 text-lg"
            >
              Profile
            </Link>
          </div>
        </div>

        <div className="w-1/6 flex justify-center items-center">
          <div className=" flex flex-col justify-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium text-darkblue">
            <Link
              to="/login"
              className="text-3xl hover:text-white md:inline sm:block py-2"
              onClick={() => {
                Swal.fire("Logout Success!", "See you later!", "success");
                localStorage.clear();
              }}
            >
              <MdLogout /> 
            </Link>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Header;