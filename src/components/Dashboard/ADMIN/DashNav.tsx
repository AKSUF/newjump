
import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../../../assets/JumpStartLogo.png";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupIcon from "@mui/icons-material/Group";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { NavLink } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { SearchOutlined } from "@mui/icons-material";
import MenuProfile from "../../Layout/Navbar/MenuProfile";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";



type Props = {
  role: String;
};
const DashNav = (props: Props) => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  const { role } = props;

  const [showOption, setShowOption] = useState(false);
  const handleClick = () => {
    setShowOption(!showOption);
  };
  return (
    <div>
      <div className=" py-1 test fixed w-full left-0  shadow-red-300 shadow-sm top-0 z-20  backdrop-filter backdrop-blur-lg bg-opacity-60">
        <div className=" flex justify-between items-center md:h-16 sm:h-16 h-14 lg:px-8 md:px-5 sm:px-5 px-5 mx-auto text-red-700">
        <div className=" text-red-800 ">
            <img className="w-32 mr-2 " src={Logo} alt="/" />{" "}
          </div>

          <ul className="hidden md:flex cursor-pointer  uppercase  text-center font-bold lg:text-[15px] md:text-[10px]">
            <li className="md:px-2 dark:hover:text-red-900 font-normal flex flex-col justify-center">
              <div className="flex  rounded">
                <input
                  type="text"
                  className="block w-full px-2 py-1  
                    shadow-sm
                    mr-2 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Search..."
                />
                <button
                  className="px-2
                  shadow-red-300 shadow-md
                  text-white bg-red-700 border-l rounded "
                >
                  <SearchOutlined />
                </button>
              </div>
            </li>
            <li className="flex flex-col justify-center">
              <MenuProfile role={role} />
            </li>
          </ul>

          <div onClick={handleNav} className="block md:hidden ">
            {!nav ? (
              <AiOutlineClose className="font-bold" size={25} />
            ) : (
              <AiOutlineMenu className="font-bold" size={25} />
            )}
          </div>
          <div
            className={
              !nav
                ? "absolute left-0  top-0  z-20 h-full md:w-[30%] sm:w-[40%] w-[55%] m-0 ease-in-out duration-500 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-60 md:hidden"
                : "fixed left-[-200%]"
            }
          >
            {" "}
            <div className="test2 h-screen overflow-y-auto  left-0 top-0 z-20 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-60">
            <div className=" text-red-800 ">
            <img style={{width: "10%", height: "10px"}} src={Logo} alt="/" />

          </div>
              <ul className="px-4  text-left text-xl cursor-pointer  ">
                <li>
                  <div className="items-center">
                    <div className="flex  rounded">
                      <input
                        type="text"
                        className="block w-full px-2 py-1  bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search..."
                      />
                      <button className="p-1 text-white bg-gray-600 border-l rounded ">
                        <SearchIcon />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>

              <ul className="p-4 uppercase text-left text-[13px] cursor-pointer font-bold ">
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                <NavLink to="/admin/home">
                <HomeIcon className="inline-block mr-2 mb-2 " />
                Home
              </NavLink>                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/admin/all-users">
                    <GroupIcon className="inline-block ml-0 mr-2 mb-2  " />
                    User Information
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/admin/products">
                    <FormatListBulletedIcon className="inline-block ml-0 mr-2 mb-2  " />
                    All Products
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/admin/pending-product">
                    <FilterListOffIcon className="inline-block ml-0 mr-2 mb-2  " />
                    Pending Products
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 hover:border-gray-400 hover:text-green-700">
                  <NavLink to="/admin/all-users-request">
                    <GroupAddIcon className="inline-block ml-0 mr-2 mb-2  " />
                    All User Requests
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/admin/stores">
                    <StorefrontIcon className="inline-block ml-0 mr-2 mb-2  " />
                    Store
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/admin/add-store">
                    <AddBoxIcon className="inline-block ml-0 mr-2 mb-2  " />
                    Add Store
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/admin/rider-delivery">
                    <DeliveryDiningIcon className="inline-block ml-0 mr-2 mb-2  " />
                    Rider Delivery
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/admin/courier-delivery">
                    <LocalShippingIcon className="inline-block ml-0 mr-2 mb-2  " />
                    Shipping Courier
                  </NavLink>
                </li>
                
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                   < MenuProfile role={role}/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:h-16  sm:h-8 h-14"></div>
    </div>
  );
};

export default DashNav;