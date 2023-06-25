import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Checkbox,
  CardActions,
  Button,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import FormGroup from "@mui/material/FormGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteCart,
  getCartByUser,
  updateQty,
} from "../../service/AddToCartService";
import { toast } from "react-toastify";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { getPersonalProfile } from "../../service/ProfileService";

const AddToCart = () => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [carts, setCarts] = useState();

  const token = localStorage.getItem("token");
  var totalPrize=0;
  const navigate = useNavigate();
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

  function deleteCarts(cart) {
    if (window.confirm("Do you really want to remove?")) {
      deleteCart(cart.cart_id, token)
        .then((data) => {
          console.log(data);
          toast.success("Cart is delete");
          navigate("/user/cart");
          let newCarContent = cart.filter((c) => c.cart_id != cart.cart_id);
          setCarts([...newCarContent]);
        })
        .catch((error) => {
          toast.error("Error in deleting post");
        });
    }
  }

  const handleDecrement = (cart_id, cart) => {
    setCarts((carts) =>
      carts.map((cart) =>
        cart_id === cart.cart_id
          ? { ...cart, qty: cart.qty - (cart.qty > 1 ? 1 : 0) }
          : cart
      )
    );
    updateQty(cart_id, cart.qty.token);
  };
  const handleIncrement = (cart_id, cart) => {
    setCarts((carts) =>
      carts.map((cart) =>
        cart_id === cart.cart_id
          ? {
              ...cart,
              qty:
                cart.qty +
                (cart.qty < cart.product.availableQuantity - 1 ? 1 : 0),
            }
          : cart
      )
    );
    updateQty(cart_id, cart.qty,token);
  };

 

  return (
    <div className="bg-gray-50 pb-24">
      <div className=" pt-2 mb-10">
        <Container maxWidth="xl">
          <Grid container mt={2} className="mb-4">
            <Grid item xs={12}>
              <Box textAlign="center">
                <div className="w-72 font-medium mb-2 ">
                  <div
                    onClick={() => setOpen(!open)}
                    className={`bg-white w-full p-2 flex items-center justify-between rounded border ${
                      !selected && "text-gray-700"
                    }`}
                  >
                    {selected
                      ? selected?.length > 25
                        ? selected?.substring(0, 25) + "..."
                        : selected
                      : "Select Meal"}
                    <BiChevronDown
                      size={20}
                      className={`${open && "rotate-180"}`}
                    />
                  </div>
                  <ul
                    className={`bg-white mt-2 m- overflow-y-auto border   ${
                      open ? "max-h-60" : "max-h-0"
                    } `}
                  >
                    <div className="flex items-center px-2 sticky top-0 border-b-2 bg-white">
                      <AiOutlineSearch size={18} className="text-gray-700" />
                      <input
                        type="text"
                        value={inputValue}
                        placeholder="Enter Meal"
                        className="placeholder:text-gray-700 p-2 outline-none"
                      />
                    </div>

                    <li className="p-1 border-b mx-4 border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                      Fruit
                    </li>
                    <li className="p-1 border-b mx-4 border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                      Vegetable
                    </li>
                    <li className="p-1  mx-4 border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                      Drinks
                    </li>
                  </ul>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} className="my-2 bg-white p-2">
              <Box>
                <Grid container spacing={4}>
                  <Grid item lg={6} xs={6}>
                    <Box textAlign="left">
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Select"
                        />
                      </FormGroup>
                    </Box>
                  </Grid>
                  <Grid item lg={6} xs={6} className="inline-block text-right ">
                    <Box bgcolor="white" className="inline-block  ">
                      <button className="hover:text-red-700 text-red-600 outline-none">
                        <DeleteIcon />
                        Delete All
                      </button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* All Cart */}

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box className=" " textAlign="center">
                  <Grid container mt={0} spacing={1} className="">
                    {carts != undefined
                      && carts.map((cart, index) => {
                        totalPrize += cart.product.price * cart.qty;
                        return(
                          <Grid item lg={6} md={12} xs={12} className="">
                            <Box textAlign="center">
                              <Grid item xs={12}>
                                <Box bgcolor="white" className=" text-right ">
                                  <button
                                    onClick={() => deleteCarts(cart)}
                                    className="hover:text-red-700 outline-none"
                                  >
                                    {" "}
                                    <DeleteIcon className="border mr-3 text-red-600" />
                                  </button>
                                </Box>
                              </Grid>

                              <Grid item xs={12}>
                                <Box textAlign="center">
                                  <Grid container>
                                    <Grid
                                      item
                                      lg={0.6}
                                      md={0.8}
                                      xs={0.8}
                                      className="border-r-2"
                                    >
                                      <Box
                                        bgcolor="white"
                                        textAlign="center"
                                        sx={{ height: 210 }}
                                      >
                                        <FormGroup className="sm:pl-2 pt-20   ">
                                          <FormControlLabel
                                            control={<Checkbox />}
                                            label=""
                                          />
                                        </FormGroup>
                                      </Box>
                                    </Grid>

                                    <Grid item lg={9.4} md={9.2} xs={8.7}>
                                      <Box textAlign="center">
                                        <Card
                                          elevation={0}
                                          className="rounded-none"
                                          sx={{ display: "flex" }}
                                        >
                                          <CardMedia
                                            component="img"
                                            sx={{ width: 250, height: 200 }}
                                            className="md:mr-3  md:my-1 md:mx-3"
                                            image={
                                              "/api/v1/producer/products/image/" +
                                              cart.product.image
                                            }
                                          />
                                          <Box className="text-left md:mx-4 sm:mx-2 md:px-7">
                                            <CardContent
                                              sx={{ flex: "1 0 auto" }}
                                            >
                                              <Typography>
                                                <h6 className=" font-bold sm:text-1xl text-[15px] text-gray-500">
                                                  {cart.product.productName}
                                                  
                                                </h6>
                                              </Typography>
                                              <Typography>
                                                <h2 className="md:text-[16px] sm:text-[14px] text-[12px]">
                                                  <p className="text-[14px]">
                                                    <span className="font-bold  ">
                                                      Category:{" "}
                                                    </span>
                                                    {cart.product.category}
                                                  </p>
                                                  <p className="text-[14px]">
                                                    {" "}
                                                    <span className="font-bold">
                                                      Price:{" ৳ "}
                                                    </span>
                                                    {cart.product.price}
                                                  </p>
                                                </h2>
                                                <h3 className="md:text-[16px] sm:text-[14px] text-[12px]">
                                                  {" "}
                                                  <p className="text-[14px]">
                                                    {cart.product.status}
                                                  </p>
                                                </h3>
                                              </Typography>
                                            </CardContent>
                                            <CardActions>
                                              <Box className="text-center">
                                                <Link
                                                  to={
                                                    `/user/product-details/` +
                                                    cart.product.productId
                                                  }
                                                >
                                                  <button className=" bg-green-600 py-2  my-1 font-bold  sm:text-[15px] text-[12px] mr-2 hover:bg-green-700  w-[56px]  text-white rounded-md mx-auto ">
                                                    Details
                                                  </button>
                                                </Link>
                                                <NavLink
                                                  to={
                                                    "/user/delivery-form/" +
                                                    cart.product.productId +
                                                    "/" +
                                                    cart.qty
                                                  }
                                                >
                                                  <button className=" bg-orange-600 py-2 font-bold sm:text-[14px]  text-[12px] hover:bg-orange-700  sm:w-[85px] w-[80px]   text-white rounded-md mx-auto ">
                                                    Order Now
                                                  </button>
                                                </NavLink>
                                              </Box>
                                            </CardActions>
                                          </Box>
                                        </Card>
                                      </Box>
                                    </Grid>
                                    <Grid item lg={2} md={2} xs={2.5}>
                                      <Box bgcolor="white" sx={{ height: 210 }}>
                                        <Grid container>
                                          <Grid item xs={12}>
                                            <Box bgcolor="white">
                                              <Box
                                                className="pt-12 ml-1"
                                                sx={{ display: "flex" }}
                                              >
                                                <IconButton
                                                  onClick={() =>
                                                    handleDecrement(
                                                      cart.cart_id,
                                                      cart
                                                    )
                                                  }
                                                >
                                                  <IndeterminateCheckBoxIcon />
                                                </IconButton>
                                                <div className="text-[20px]  pt-2">
                                                  {cart.qty}
                                                </div>
                                                <IconButton
                                                  onClick={() =>
                                                    handleIncrement(
                                                      cart.cart_id,
                                                      cart
                                                    )
                                                  }
                                                >
                                                  <AddBoxIcon />
                                                </IconButton>
                                              </Box>
                                            </Box>
                                          </Grid>
                                          <Grid item xs={12} className="pb-4">
                                            <Box bgcolor="white" >
                                              <Box
                                                className=" "
                                                sx={{ display: "flex" }}
                                              >
                                                <Box className="bg-red-50 p-2 ">
                                                  <h1 className="font-bold block uppercase underline underline-offset-4">
                                                    {" "}
                                                    Total Price
                                                  </h1>
                                                  <h1>
                                                    ৳{" "}
                                                    {cart.product.price *
                                                      cart.qty}
                                                  </h1>
                                                </Box>
                                              </Box>
                                            </Box>
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </Grid>
                            </Box>
                          </Grid>
                        )})}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            
            <Grid item xs={12} >
              <Card elevation={1}>
                

                <CardContent pt={1}  >
                <Grid container spacing={1}>
                <Grid item xs={6} >
                  <div  >
                    <div className="text-xl text-left"><span className="font-bold uppercase text-gray-600"> Total:</span> ৳ {totalPrize}</div>
                    </div>
                  
                     </Grid>
                     
                      <Grid item xs={6} >
                    <Box  className=" text-right">
                      <Button className="text-right" variant="contained">
                        Chekout
                      </Button>
                    </Box>{" "}
                    </Grid>
                    </Grid>

                  
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default AddToCart;