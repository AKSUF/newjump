import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import CashOnDelivery from "../assets/cashondelivery.png";
  import Stripe from "../assets/Stripe.png";
  import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
  import { getPersonalProfile } from "../service/ProfileService";
  import { getProductSingleDetails } from "../service/ProductService";
  import { cashOnDelivery } from "../service/Delivery";
  import { toast } from "react-toastify";
  
  import { payWithStripe } from "../service/Delivery";
  
  import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";
  
  const PaymentMethod = () => {
    const [open, setOpen] = useState(false);
    const { productId } = useParams();
    const { delivery_details_id } = useParams();
    const { quantity } = useParams();
    const [deliveryDetails, setDeliveryDetails] = useState<any>();
    const [product, setProduct] = useState<any>();
    const totalPrice = quantity
      ? product?.price * parseInt(quantity) + product?.charge
      : 0;
    const subTotalPrice = quantity ? product?.price * parseInt(quantity) : 0;
    const token = localStorage.getItem("token");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [order, setOrder] = useState<any>();
    const [delivery, setDelivery] = useState({
      amount: "",
    });
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const navigate = useNavigate();
    useEffect(() => {
      getPersonalProfile(token)
        .then((res) => {
          console.log(res.data);
          getProductSingleDetails(productId, token)
            .then((res) => {
              console.log(res.data);
              setProduct(res.data);
  
              const totalPrice = quantity
                ? res.data.price * parseInt(quantity) + res.data.charge
                : 0;
              setDelivery({
                ...delivery,
                amount: totalPrice.toString(),
              });
            })
            .catch((error) => {
              console.log(error);
              toast.error(error);
            });
        })
        .catch((error) => {
          toast.error(error);
        });
    }, [productId, token]);
  
    const handleSubmit = (event: any) => {
      const token = localStorage.getItem("token");
      cashOnDelivery(productId, token, delivery_details_id, quantity)
        .then((res) => {
          console.log("++++++++++++++++++++" + token);
          toast.success(
            "Order has been posted with delivery number " +
              res.data.delivery_number
          );
          setOrder(res.data)
          setDialogOpen(true);
        
        })
        .catch((error) => {
          console.log(error);
  
          toast.error("Posting order failed, Please retry later!");
        });
    };
    const handleDialogClose = () => {
      setDialogOpen(false); // Close the thank you dialog
    };


    const stripehandleSubmit = (event: any) => {
      event.preventDefault();
      payWithStripe(delivery, productId, token, delivery_details_id, quantity)
        .then((res) => {
          console.log("+++++++++++++" + res.data);
          toast.success("Payment Successful");
        //  navigate("/user/cash-on-delivery/"+order.delivery_id)
        })
        .catch((error) => {
          toast.error("Payment Error");
          console.log(error);
        });
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setDelivery({
        ...delivery,
        [name]: value,
      });
    };
    return (
      <div className="my-6">
        <Grid container spacing={1} className="py-10 px-2 mt-10">
          <Grid item xs={1} lg={2} md={2}>
            <Box className="bg-red-600 "></Box>
          </Grid>
          <Grid item xs={5} lg={4} md={4}>
            <Grid
              container
              spacing={1}
              className="border  pb-10 flex justify-center  
                   items-center"
            >
              <Grid item xs={12} className="bg-gray-300   py-4 text-xl font-bold">
                <h1>Select Payment Method</h1>
              </Grid>
  
              <Grid item xs={5}>
                <Box className=" pt-5 mr-5">
                  <Card elevation={10}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="Not Uploaded"
                        style={{
                          backgroundSize: "cover",
                          height: "100px",
                        }}
                        image={CashOnDelivery}
                        className="bg-gray-300"
                      />
                    </Box>
                    <CardContent>
                      <Typography className="text-xl" color="text.secondary">
                        <Button
                          onClick={(e) => handleSubmit(e)}
                          variant="contained"
                          color="secondary"
                        >
                          Cash On Delivery
                        </Button>
                        <Dialog open={dialogOpen} onClose={handleDialogClose}>
                          <DialogTitle
                            color={"green"}
                            fontSize={"30px"}
                            fontWeight={"bold"}
                          >
                            Thank you for your order!
                          </DialogTitle>
                          <div className="px-8  text-center text-[20px] font-bold font-serif">
                            <p>We appreciate your business.</p>
                            <p>Your order will be delivered soon.</p>
                          </div>
            {order && (
  
                          <Link
                            className="text-right text-[18px]  text-blue-700 p-5"
                            to={"/user/cash-on-delivery/"+order.delivery_id}
                          >
                            Back
                          </Link>
            )}
                        </Dialog>
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box className=" pt-5 mr-5">
                  <Card elevation={10}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className="text-whit"
                    >
                      <CardMedia
                        component="img"
                        alt="Not Uploaded"
                        style={{
                          backgroundSize: "cover",
                          height: "100px",
                        }}
                        image={Stripe}
                        className="bg-purple-700"
                      />
                    </Box>
                    <CardContent>
                      <Typography className="text-xl" color="text.secondary">
                        <Button variant="contained" onClick={handleClickOpen}>
                          Pay with Stripe
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                          <DialogTitle>Payment Information</DialogTitle>
                          <DialogContent>
                            <form onSubmit={handleSubmit}>
                              <TextField
                                id="amount"
                                name="amount"
                                label="Amount"
                                type="number"
                                value={delivery.amount}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                              />
                            </form>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                              onClick={stripehandleSubmit}
                              variant="contained"
                              color="primary"
                            >
                              Pay with Stripe
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={5}
            lg={4}
            md={4}
            className="flex  justify-center items-center "
          >
            <Box className="w-full">
              <Card elevation={10} className="">
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                ></Box>
                <CardContent>
                  <Typography className="text-xl" color="text.secondary">
                    <p> Sub Total Amount : ৳ {subTotalPrice}</p>
                    Total Amount : ৳ {totalPrice}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={1} lg={2} md={2}></Grid>
        </Grid>
      </div>
    );
  };
  
  export default PaymentMethod;