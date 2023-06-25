import React from "react";
  import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ViewListIcon from '@mui/icons-material/ViewList';
import InventoryIcon from '@mui/icons-material/Inventory';
import PendingIcon from '@mui/icons-material/Pending';
 import AddBoxIcon from '@mui/icons-material/AddBox';
 import MessageIcon from '@mui/icons-material/Message';
import { NavLink } from "react-router-dom"; 
import { FaProductHunt } from "react-icons/fa";

const StoreDash =  () => {
 
  return (
    <div className="md:flex hidden ">
      <div className="   h-full w-full left-0 top-2 z-20   ">
          <div className="">
          </div>
          
            <ul className="p-4 uppercase text-left text-[16px] cursor-pointer font-bold text-red-700">
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
              <NavLink to="/store/home">
                <HomeIcon className="inline-block mr-2 mb-2 " />
                Home
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
              <NavLink to="/store/store-products">
                <FaProductHunt className="inline-block  ml-0 mr-2 mb-2  " />
               Store Products
              </NavLink>
            </li>
             <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
              <NavLink to="/store/product">
                <FaProductHunt className="inline-block  ml-0 mr-2 mb-2  " />
                Products
              </NavLink>
            </li> 
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
              <NavLink to="/store/product-pending">
                <PendingIcon className="inline-block ml-0 mr-2 mb-2  " />
                Pending Products
              </NavLink>
            </li>
             <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
              <NavLink to="/store/add-product">
                <AddBoxIcon className="inline-block ml-0 mr-2 mb-2  " />
                Add Product
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
              <NavLink to="/about-us">
                <MessageIcon className="inline-block ml-0 mr-2 mb-2 " />
                Messages
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
              <NavLink to="/store/order-products">
                <ViewListIcon className="inline-block ml-0 mr-2 mb-2  " />
                Order
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-400">
              <NavLink to="/store/buy-product">
                <InventoryIcon className="inline-block ml-0 mr-2 mb-2  " />
                Buy Product
              </NavLink>
            </li>
           
         
             
              
            </ul>
            
       
 
        </div>
    </div>
  );
};
export default StoreDash