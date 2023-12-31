import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { FaProductHunt } from "react-icons/fa";
import Logo from "../../../assets/JumpStartLogo.png";
import Logos from "../../../assets/Logo/whatsapp.png";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import MenuProfile from "./MenuProfile";
import TotalCart from "../../User/TotalCart";
import SearchIcon from "@mui/icons-material/Search";
type Props = {
  role: String;
};

const Navbar = (props: Props) => {
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
      <div className=" py-1 test shadow-red-300 shadow-sm w-full left-0 fixed top-0 z-20  backdrop-filter backdrop-blur-lg bg-opacity-60">
        <div className=" flex justify-between items-center md:h-16 sm:h-16 h-14 lg:px-8 md:px-5 sm:px-5 px-5 mx-auto text-red-700">
          <div className=" text-red-800 ">
            <img className="w-25 h-20 mr-2 " src={Logo} alt="/" />{" "}
          </div>
          <div className="w-16"></div>
          {role === "" ? (
            <ul className="hidden lg:flex cursor-pointer  uppercase  text-center font-bold lg:text-[15px] md:text-[10px]">
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

              <li className="lg:p-4 md:px-2 pt-1 dark:hover:text-red-500 md:pt-1">
                <NavLink to="/">
                  <HomeIcon className="inline-block md:border-none ml-0 mr-2 mb-1  text-red-700 " />
                  Home
                </NavLink>
              </li>
              <li className="lg:p-4 md:px-2 dark:hover:text-red-500 md:pt-1">
                <NavLink to="/products">
                  <FaProductHunt className="inline-block ml-0 mr-2 mb-1 text-red-700 " />
                  Products
                </NavLink>
              </li>

              <li
                onClick={handleClick}
                className="lg:p-4 relative md:px-2 "
                x-data="{dropdownIpen:false}"
              >
                <ArrowDropDownCircleIcon className="inline-block ml-0 mr-1  text-red-700 " />
                More
                {showOption && (
                  <div className="md:absolute bg-white border p-2 rounded-lg  right-0">
                    <ul className="space-y-2 l md:w-64">
                      <li className="lg:p-2 md:p-2  border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-red-500">
                        <NavLink to="/about-us">
                          <InfoIcon className="inline-block ml-0 mr-2 mb-1 text-red-700" />
                          <span className=" md:inline-block">About Us</span>
                        </NavLink>
                      </li>

                      <li className="lg:p-2 md:p-2  border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-red-500">
                        <NavLink to="/contact-us">
                          <ContactsIcon className="inline-block ml-0 mr-2 mb-1 text-red-700" />
                          <span className=" md:inline-block">Contact Us</span>
                        </NavLink>
                      </li>
                      <li className="lg:p-2 md:px-2 dark:hover:text-red-500">
                        <NavLink to="/role/register">
                          <AppRegistrationIcon className="inline-block ml-0 mr-1 mb-2 text-red-700 " />
                          <span className=" md:inline-block">
                            Role Based Registration
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li className="lg:p-4 md:px-2 dark:hover:text-red-500">
                <NavLink to="/login">
                  <LoginIcon className="inline-block ml-0 mr-2 mb-1 text-red-700 " />
                  Login
                </NavLink>
              </li>
              <li className="lg:p-4 px-2 md:px-2 dark:hover:text-red-500 ">
                <NavLink to="/register">
                  <AppRegistrationIcon className="inline-block ml-0 mr-1 mb-2 text-red-700 " />
                  Registration
                </NavLink>
              </li>
            </ul>
          ) : (
            <></>
          )}
          {role === "USER" ? (
            <ul className="hidden lg:flex cursor-pointer  uppercase  text-center font-bold lg:text-[15px] md:text-[10px]">
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

              <li className="lg:p-4 md:px-2 pt-1 dark:hover:text-red-500 md:pt-1">
                <NavLink to="/">
                  <HomeIcon className="inline-block md:border-none ml-0 mr-2 mb-1  text-red-700 " />
                  Home
                </NavLink>
              </li>
              <li className="lg:p-4 md:px-2 dark:hover:text-red-500 md:pt-1">
                <NavLink to="/user/products">
                  <FaProductHunt className="inline-block ml-0 mr-2 mb-1 text-red-700 " />
                  Products
                </NavLink>
              </li>

              <li
                onClick={handleClick}
                className="lg:p-4 relative md:px-2 dark:hover:text-red-500"
                x-data="{dropdownIpen:false}"
              >
                <ArrowDropDownCircleIcon className="inline-block ml-0 mr-1  text-red-700 " />
                More
                {showOption && (
                  <div className="md:absolute bg-white border p-2 rounded-lg  right-0">
                    <ul className="space-y-2 l md:w-48">
                      <li className="lg:p-2 md:p-2  border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-red-500">
                        <NavLink to="/user/my-orders">
                          <InfoIcon className="inline-block ml-0 mr-2 mb-1 text-red-700" />
                          <span className=" md:inline-block">My Orders</span>
                        </NavLink>
                      </li>
                      <li className="lg:p-2 md:p-2  border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-red-500">
                        <NavLink to="/about-us">
                          <InfoIcon className="inline-block ml-0 mr-2 mb-1 text-red-700" />
                          <span className=" md:inline-block">About Us</span>
                        </NavLink>
                      </li>

                      <li className="lg:p-2 md:px-2 dark:hover:text-red-500">
                        <NavLink to="/contact-us">
                          <ContactsIcon className="inline-block ml-0 mr-1 mb-2 text-red-700 " />
                          <span className=" md:inline-block">Contact Us</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li className="flex flex-col justify-center">
                <MenuProfile role={role} />
              </li>
              <li className="lg:p-4 mr-5 pt-1  dark:hover:text-red-500 md:pt-1">
                <TotalCart />
              </li>
            </ul>
          ) : (
            <></>
          )}

          <div onClick={handleNav} className="block lg:hidden ">
            {!nav ? (
              <AiOutlineClose className="font-bold" size={25} />
            ) : (
              <AiOutlineMenu className="font-bold" size={25} />
            )}
          </div>
          <div
            className={
              !nav
                ? "fixed left-0 top-0 z-20 h-full md:w-[30%] sm:w-[40%] w-[55%] m-0 ease-in-out duration-500 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-60 lg:hidden"
                : "fixed left-[-100%]"
            }
          >
            {" "}
            <div className="test2 left-0 top-0 z-20 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-60">
            <div className=" text-red-800 ">
            <img className="w-32 mr-2 " src={Logos} alt="/" />{" "}
          </div>
             
              <ul className="px-4  text-left text-1xl cursor-pointer  ">
                <li>
                  <div className=" items-center">
                    <div className="flex  rounded">
                      <input
                        type="text"
                        className="block w-full px-2 py-1  bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search..."
                      />
                      <button className="px-1 text-white bg-gray-600 border-l rounded ">
                        <SearchIcon />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>

              <ul className="p-4 uppercase text-left text-1xl cursor-pointer font-bold ">
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/meals">Meals</NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/about-us">About Us</NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/contact-us">Contact Us</NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/login">Role Based Registration</NavLink>
                </li>
                <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li className="p-4 border-gray-600 hover:border-b dark:hover:border-gray-400 dark:hover:text-green-700">
                  <NavLink to="/register">Registration</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:h-16 sm:h-14 h-14"></div>
    </div>
  );
};

export default Navbar;