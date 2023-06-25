import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import PendingIcon from "@mui/icons-material/Pending";
import { NavLink } from "react-router-dom";

const ProducerDash = () => {
  return (
    <div className="md:flex hidden  ">
      <div className="   h-full w-full left-0 top-2 z-20   ">
        <div className=""></div>

        <ul className="p-4 uppercase text-left text-[16px] cursor-pointer font-bold text-red-700">
          <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
            <NavLink to="/producer/home">
              <HomeIcon className="inline-block mr-2 mb-2 " />
              Home
            </NavLink>
          </li>
          <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
            <NavLink to="/producer/orders">
              <PendingIcon className="inline-block ml-0 mr-2 mb-2  " />
              Order
            </NavLink>
          </li>
          <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
            <NavLink to="/producer/accept-orders">
              <ViewListIcon className="inline-block ml-0 mr-2 mb-2  " />
              Accepted Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProducerDash;