import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import InventoryIcon from "@mui/icons-material/Inventory";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { NavLink } from "react-router-dom";

const RiderDash = () => {
  return (
    <div className="md:flex hidden  ">
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
            <NavLink to="/rider/orders">
              <DeliveryDiningIcon className="inline-block ml-0 mr-2 mb-2  " />
              Latest Order
            </NavLink>
          </li>
          <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
            <NavLink to="/rider/my-order-delivery">
              <DeliveryDiningIcon className="inline-block ml-0 mr-2 mb-2  " />
              My Order Delivery
            </NavLink>
          </li>

          <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
            <NavLink to="/rider/available-shift">
              <EventAvailableIcon className="inline-block ml-0 mr-2 mb-2  " />
              Available Shifts
            </NavLink>
          </li>
          <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
            <NavLink to="/rider/my-shift">
              <InventoryIcon className="inline-block ml-0 mr-2 mb-2 " />
              My Shifts
            </NavLink>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default RiderDash;