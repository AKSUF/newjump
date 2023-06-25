import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { getPersonalProfile } from "../../service/ProfileService";
import { getSingleDelivery } from "../../service/Delivery";
import { useParams } from "react-router-dom";
import PaidOrPayable from "../../Utils/PaidOrPayable";
import DeliveryStatus from "../../Utils/DeliveryStatus";

const CashOnDeliveryDetails = () => {
  const { delivery_id } = useParams();
  const token: any = localStorage.getItem("token");
  const [delivery, setDelivery] = useState<any>();

  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        getSingleDelivery(delivery_id, token)
          .then((res) => {
            console.log(res.data);
            setDelivery(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const printDate = (numbers: any, options: any = {}) => {
    const { day = "numeric", month = "short" } = { ...options };
    const date = new Date(numbers);
    return date.toLocaleDateString("en-US", { day, month });
  };

  return (
    <div className="mt-8 min-h-screen">
      <Container maxWidth="xl">
        {delivery && (
          <Grid container>
            <Grid item xs={12} className="delivery ">
              <Grid container spacing={2}>
                <Grid item md={8} xs={12}>
                  {delivery.paidOrPayable === PaidOrPayable.Payable &&
                  delivery.status !== DeliveryStatus.Delivered ? (
                    <>
                      <Box className="pt-8 px-8">
                        <Typography className="text-[#D7D7D7] ">
                          <h1 className="md:text-[30px] text-[24px] font-bold">
                            Waiting For Payment{" "}
                          </h1>
                          <h1 className="md:text-[24px] sm:text-[20px] font-bold">
                            Your Order Number is <br />
                            {delivery.delivery_number}
                          </h1>
                        </Typography>
                        <Typography className=" text-white">
                          <h1 className="md:text-[24px] sm:text-[20px] font-bold">
                            Delivery will be done by{" "}
                            {printDate(delivery.standeredDeliveryDate)}
                          </h1>
                          <h1 className="md:text-[30px] text-[24px] font-bold">
                            Please have this amount on delivery day
                          </h1>
                          <h1 className="md:text-[30px] font-extrabold text-[24px] text-green-400">
                            ${delivery.amount}
                          </h1>
                        </Typography>
                      </Box>
                    </>
                  ) : delivery.paidOrPayable === PaidOrPayable.Paid &&
                    delivery.status !== DeliveryStatus.Delivered ? (
                    <Box className="pt-8 px-8">
                      <Typography className="text-[#D7D7D7] ">
                        <h1 className="md:text-[30px] text-[24px] font-bold">
                          Your Order Number is <br />
                          {delivery.delivery_number}
                        </h1>
                      </Typography>
                      <Typography className=" text-white">
                        <h1 className="md:text-[24px] sm:text-[20px] font-bold">
                          Your product has been successfully delivered on{" "}
                          {printDate(delivery.standeredDeliveryDate)}
                        </h1>
                        <h1 className="md:text-[30px] text-[24px] font-bold">
                          You will receive your product on time
                        </h1>
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Box className="pt-8 px-8">
                        <Typography className="text-[#D7D7D7] ">
                          <h1 className="md:text-[30px] text-[24px] font-bold">
                            Your Order Number is <br />
                            {delivery.delivery_number}
                          </h1>
                        </Typography>
                        <Typography className=" text-white">
                          <h1 className="md:text-[24px] sm:text-[20px] font-bold">
                            Your product has been successfully delivered on{" "}
                            {printDate(delivery.standeredDeliveryDate)}
                          </h1>
                        </Typography>
                      </Box>
                    </>
                  )}
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <Typography className="text-white">
                      <Box className="text-center" fontWeight="bold">
                        <h1 className="md:text-[30px] sm:text-[24px]">
                          Rider Phone Number: <br />
                          {delivery.riderDelivery?.rider.phone_number}
                        </h1>
                        <Button variant="contained" color="error">
                          Chat With Us
                        </Button>
                      </Box>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box className="bg-gray-200 mt-4">
                <Typography className=" p-8">
                  <h1 className="md:text-[24px] text-[20px]">
                    {" "}
                    <span className=" font-bold"> Reciver: </span>{" "}
                    {delivery.deliveryDetails.name}
                  </h1>
                  <h1 className="md:text-[24px] text-[20px]">
                    {" "}
                    <span className=" font-bold"> Phone No: </span>{" "}
                    {delivery.deliveryDetails.phone_number}
                  </h1>
                  <h1 className="md:text-[24px] text-[20px]">
                    {" "}
                    <span className=" font-bold"> Address: </span>{" "}
                    {delivery.deliveryDetails.delivery_address}
                  </h1>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={3} md={5} xs={12}>
                  <Box
                    className="bg-gray-200 text-center mt-4 lg:h-72 h-16 p-3"
                    display="flex"
                    justifyItems="center"
                    alignItems="center"
                  >
                    <Typography className=" ">
                      <h1 className="md:text-[30px] font-bold text-[24px]">
                        {" "}
                        Your order delivery status is:{" "}
                        {delivery.status === DeliveryStatus.Pending ? (
                          <>
                            <span className=" text-orange-400">PENDING </span>
                          </>
                        ) : delivery.status ===
                          DeliveryStatus.AcceptForDeliver ? (
                          <>
                            <span className=" text-orange-400">PENDING </span>
                          </>
                        ) : delivery.status === DeliveryStatus.OutForDeliver ? (
                          <>
                            <span className=" text-blue-400">
                              OUT FOR DELIVERY{" "}
                            </span>
                          </>
                        ) : delivery.status === DeliveryStatus.Arrived ? (
                          <>
                            <span className=" text-red-700">ARRIVED </span>
                          </>
                        ) : (
                          <>
                            <span className=" text-green-500">DELIVERED </span>
                          </>
                        )}
                      </h1>
                    </Typography>
                  </Box>
                </Grid>

                <Grid item lg={9} md={7} xs={12}>
                  <Box className="bg-gray-200 mt-4  h-72">
                    <Card
                      elevation={8}
                      className="rounded-none  h-72"
                      sx={{ display: "flex" }}
                    >
                      <CardMedia
                        component="img"
                        className=" text-left "
                        style={{
                          backgroundSize: "cover",
                          width: "70%",
                        }}
                        image={
                          "/api/v1/producer/products/image/" +
                          delivery.product.image
                        }
                      />
                      <Box className="text-left w-9/12  ">
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography>
                            <h6 className=" font-bold sm:text-1xl text-[15px] text-gray-500">
                              <p className="text-[17px]">
                                <span className="font-bold  ">
                                  Product Name:{" "}
                                </span>
                                {delivery.product.productName}
                              </p>
                              <p className="text-[17px]">
                                <span className="font-bold  ">Category: </span>
                                {delivery.product.category}
                              </p>
                              <p className="text-[17px]">
                                <span className="font-bold  ">
                                  Total Amount:{" "}
                                </span>
                                $ {delivery.amount}
                              </p>
                              <p className="text-[17px]">
                                <span className="font-bold  ">
                                  Delivery By:{" "}
                                  {delivery.riderDelivery?.rider.name}
                                </span>
                                {/* {delivery.product.productName} */}
                              </p>
                              <p className="text-[17px]">
                                <span className="font-bold  ">
                                  Rider Phone Number::{" "}
                                </span>
                                {delivery.riderDelivery?.rider.phone_number}
                              </p>
                            </h6>
                          </Typography>
                        </CardContent>
                        <CardActions></CardActions>
                      </Box>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default CashOnDeliveryDetails;