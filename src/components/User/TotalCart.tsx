import React, { useEffect, useState } from "react";
import { getPersonalProfile } from "../../service/ProfileService";
import { getCartByUser } from "../../service/AddToCartService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box } from "@mui/material";


const TotalCart = () => {
    const token = localStorage.getItem("token");
    const [carts, setCarts] = useState<any>();



    useEffect(() => {
        getPersonalProfile(token)
          .then((res) => {
            console.log(res.data);
    
            getCartByUser(token)
              .then((res) => {
                setCarts(res.data);
                
                console.log(res.data);
    
                return;
              })
              .catch((error) => {
                toast.error("Error While Fetching, Please retry later!");
              });
          })
          .catch((error) => {
            toast.error("Error While Fetching, Please retry later!");
          });
      }, []);
  return (
    <div>
        <Box className="m-0">
        <span className="relative border bg-gray-300 px-2 z-20 rounded-full text-black p-1  -right-10 -top-3"> {carts ? carts.length : 0}</span>
        <NavLink
                  to="/user/cart"
                  className="bg-orange-600 absolute  p-2 border rounded-3xl hover:bg-orange-700"
                >
                  <ShoppingCartIcon className=" text-white" />
                </NavLink>
        </Box>
    </div>
  )
}

export default TotalCart
