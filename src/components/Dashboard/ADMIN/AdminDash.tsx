import React from "react";
import { useState } from "react";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from '@mui/icons-material/Storefront';
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupIcon from '@mui/icons-material/Group';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { NavLink } from "react-router-dom";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Logo from "../../../assets/Logo/whatsapp.png";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

const AdminDash =  () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const [showOption, setShowOption] = useState(false);
  const handleClick = () => {
    setShowOption(!showOption);
  };
  return (
    <div className="md:flex hidden  overflow-y-auto ">
      <div className="   h-full w-full left-0 top-2 z-20   ">
          <div className="">
          </div>
          
            <ul className="p-4 uppercase text-left text-[16px] cursor-pointer font-bold text-red-700">
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-900 dark:hover:text-green-900">
              <NavLink to="/admin/home">
                <HomeIcon className="inline-block mr-2 mb-2 " />
                Home
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-900 dark:hover:text-green-900">
              <NavLink to="/admin/all-users">
                <GroupIcon className="inline-block ml-0 mr-2 mb-2  " />
                User Information
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-900 dark:hover:text-green-900">
              <NavLink to="/admin/products">
                <FormatListBulletedIcon className="inline-block ml-0 mr-2 mb-2  " />
                All Products
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-900 dark:hover:text-green-900">
              <NavLink to="/admin/pending-product">
                <FilterListOffIcon className="inline-block ml-0 mr-2 mb-2  " />
                Pending Products
              </NavLink>
            </li>
            
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-900 dark:hover:text-green-900">
              <NavLink to="/admin/all-users-request">
                <GroupAddIcon className="inline-block ml-0 mr-2 mb-2  " />
               All User Requests
              </NavLink>
            </li>
             <li className="p-4 border-b border-gray-600 dark:hover:border-gray-900 dark:hover:text-green-900">
              <NavLink to="/admin/stores">
                <StorefrontIcon className="inline-block ml-0 mr-2 mb-2  " />
                Store
              </NavLink>
            </li>
             <li className="p-4 border-b border-gray-600 dark:hover:border-gray-900 dark:hover:text-green-900">
              <NavLink to="/admin/add-store">
                <AddBoxIcon className="inline-block ml-0 mr-2 mb-2  " />
                Add Store
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-900 dark:hover:text-green-900">
              <NavLink to="/admin/rider-delivery">
                <DeliveryDiningIcon className="inline-block ml-0 mr-2 mb-2  " />
                Rider Delivery
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-900 dark:hover:text-green-900">
              <NavLink to="/admin/courier-delivery">
                <LocalShippingIcon className="inline-block ml-0 mr-2 mb-2  " />
                Shipping Courier
              </NavLink>
            </li>
        
          
         
             
              
            </ul>
            
       
    
        </div>
    </div>
  );
};



export default AdminDash;