import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ViewListIcon from "@mui/icons-material/ViewList";
import InventoryIcon from "@mui/icons-material/Inventory";
import PendingIcon from "@mui/icons-material/Pending";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../../../assets/Logo/whatsapp.png";
import Logos from "../../../assets/Logo/whatsapp.png";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import MenuProfile from "../../Layout/Navbar/MenuProfile";
type Props = {
  role: String;
};
const StoreDashNav = (props: Props) => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  const { role } = props;

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
                ? "fixed left-0 top-0 z-20 h-full md:w-[30%] sm:w-[40%] w-[55%] m-0 ease-in-out duration-500 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-60 md:hidden"
                : "fixed left-[-200%]"
            }
          >
            {" "}
            <div className="test2 h-screen left-0 top-0 z-20 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-60">
              <div className=" text-red-800 ">
                <img className="w-32 mr-2 " src={Logos} alt="/" />{" "}
              </div>
              <ul className="px-4  text-left text-xl cursor-pointer  ">
                <li>
                  <div className=" items-center">
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
                  <NavLink to="/">
                    <HomeIcon className="inline-block mr-2 mb-2 " />
                    Home
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/meals">
                    <StorefrontIcon className="inline-block ml-0 mr-2 mb-2  " />
                    Products
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/about-us">
                    <PendingIcon className="inline-block ml-0 mr-2 mb-2  " />
                    Pending Products
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/contact-us">
                    <AddBoxIcon className="inline-block ml-0 mr-2 mb-2  " />
                    Add Product
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/login">
                    <MessageIcon className="inline-block ml-0 mr-2 mb-2  " />
                    Messages
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/login">
                    <ViewListIcon className="inline-block ml-0 mr-2 mb-2 " />
                    Order
                  </NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/register">
                    <InventoryIcon className="inline-block ml-0 mr-2 " />
                    Buy Product
                  </NavLink>
                </li>
                <li className="p-4 border-gray-600 hover:border-b dark:hover:border-gray-400 dark:hover:text-green-700">
                  <MenuProfile role={role} />
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

export default StoreDashNav;