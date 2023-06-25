import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

import { NavLink } from "react-router-dom";
import { FaProductHunt } from "react-icons/fa";

const EmployeeDash = () => {
  return (
    <div className="md:flex hidden  overflow-y-auto ">
      <div className="   h-full w-full left-0 top-2 z-20   ">
        <div className=""></div>

        <ul className="p-4 uppercase text-left text-[16px] cursor-pointer font-bold text-red-700">
          <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
            <NavLink to="/employee/home">
              <HomeIcon className="inline-block mr-2 mb-2 " />
              Home
            </NavLink>
          </li>
          <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
            <NavLink to="/employee/product">
              <FaProductHunt className="inline-block ml-0 mr-2 mb-2  " />
              Products
            </NavLink>
          </li>

          <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
            <NavLink to="/employee/rider-delivery">
              <DeliveryDiningIcon className="inline-block ml-0 mr-2 mb-2  " />
              Rider Delivery
            </NavLink>
          </li>
          <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
            <NavLink to="/employee/courier-delivery">
              <LocalShippingIcon className="inline-block ml-0 mr-2 mb-2 " />
              Shipping Courier
            </NavLink>
          </li>
          <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
            <NavLink to="/employee/set-shift">
              <FilterTiltShiftIcon className="inline-block ml-0 mr-2 mb-2  " />
              Set Shift
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDash;