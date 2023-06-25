import React, { useEffect, useState } from "react";
import { getPersonalProfile } from "../service/ProfileService";
import { getSingleDeliveryeDetails } from "../service/Delivery";
import { useParams } from "react-router-dom";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";

const OrderDeliveryDetails = () => {
  const { deliveryId } = useParams();
  const [delivery, setDelivery] = useState<any>();
  const token: any = localStorage.getItem("token");
  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        console.log(res.data);
        getSingleDeliveryeDetails(deliveryId, token)
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
  return (
    <div>
      <div>
        <Box
          display="flex"
          alignItems="center"
          boxShadow={3}
          m={3}
          p={2}
          borderRadius={8}
        >
          {delivery && (
            <>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                //   className="md:border-r-4 md:border-b-0 border-r-0 border-b-8"
                >
                  <Grid container className="bg-gray-100 p-3">
                    <Grid item md={4} xs={12} className="flex justify-center items-center">
                      <Avatar
                        alt="Profile Picture"
                        src={`http://localhost:8080/api/v1/producer/products/image/${delivery.product.image}`}
                        sx={{
                          width: 200,
                          height: 200,
                          mb: 2,
                          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
                        }}
                      />
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            className="underline underline-offset-2"
                            sx={{ fontWeight: "bold" }}
                          >
                            Product Details
                          </Typography>
                          <Grid item xs={12} display={"flex"}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold", color: "gray" }}
                            >
                              Product Name:
                            </Typography>
                            <Typography variant="body1" className="pt-1">
                              &nbsp; {delivery.product.productName}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} display={"flex"}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", color: "gray" }}
                          >
                            Store Name:
                          </Typography>
                          <Typography variant="body1" className="pt-1">
                            &nbsp; {delivery.product?.store.store_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", color: "gray" }}
                          >
                            Total Quantity:
                          </Typography>
                          <Typography variant="body1" className="pt-1">
                            &nbsp;{delivery.qty} (user ordered)
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          className="text-green-900"
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Total Price:
                          </Typography>
                          <Typography variant="body1" className="pt-1">
                            &nbsp; ${delivery.amount}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} display={"flex"}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", color: "gray" }}
                          >
                            Price:
                          </Typography>
                          <Typography variant="body1" className="pt-1">
                            &nbsp;$ {delivery.product.price}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", color: "gray" }}
                          >
                            Status:
                          </Typography>
                          <Typography variant="body1" className="pt-1">
                            &nbsp; {delivery.product.status}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", color: "gray" }}
                          >
                            Shipping Address:
                          </Typography>
                          <Typography variant="body1" className="pt-1">
                            &nbsp; {delivery.product.shippingAddress}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", color: "gray" }}
                          >
                            Delivery charge:
                          </Typography>
                          <Typography variant="body1" className="pt-1">
                            &nbsp; ${delivery.product.charge}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      className="bg-gray-50 p-3"
                    //   className="md:border-r-4 md:border-b-0 border-r-0 border-b-8"
                    >
                      <Grid container spacing={2}>
                      <Grid item md={4} xs={12} className="flex justify-center items-center">
                          <Avatar
                            alt="Profile Picture"
                            src={`http://localhost:8080/api/v1/users/image/${delivery.user?.profile_image}`}
                            sx={{
                              width: 200,
                              height: 200,
                              mb: 2,
                              boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
                            }}
                          />
                        </Grid>
                        <Grid item md={7} xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography
                                variant="h6"
                                className="underline underline-offset-2"
                                sx={{ fontWeight: "bold" }}
                              >
                                User Details
                              </Typography>
                            </Grid>
                            <Grid item xs={12} display={"flex"}>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", color: "gray" }}
                              >
                                User Name:
                              </Typography>
                              <Typography variant="body1" className="pt-1">
                                &nbsp; {delivery.deliveryDetails.name}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} display={"flex"}>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", color: "gray" }}
                              >
                                Phone Number:
                              </Typography>
                              <Typography variant="body1" className="pt-1">
                                &nbsp; {delivery.deliveryDetails.phone_number}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} display={"flex"}>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", color: "gray" }}
                              >
                                Address:
                              </Typography>
                              <Typography variant="body1" className="pt-1">
                                &nbsp;{" "}
                                {delivery.deliveryDetails.delivery_address},{" "}
                                {delivery.deliveryDetails.district}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                
                <Grid
                  item
                  xs={12}
                  className="bg-gray-100 p-3"
                //   className="md:border-r-4 md:border-b-0 border-r-0 border-b-8"
                >
                  <Grid container spacing={2}>
                  <Grid item md={4} xs={12} className="flex justify-center items-center">
                      <Avatar
                        alt="Profile Picture"
                        src={`http://localhost:8080/api/v1/users/image/${delivery.riderDelivery?.rider.profile_image}`}
                        sx={{
                          width: 200,
                          height: 200,
                          mb: 2,
                          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
                        }}
                      />
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            className="underline underline-offset-2"
                            sx={{ fontWeight: "bold" }}
                          >
                            Rider Details
                          </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", color: "gray" }}
                          >
                            Rider Name:
                          </Typography>
                          <Typography variant="body1" className="pt-1">
                            &nbsp; {delivery.riderDelivery?.rider.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", color: "gray" }}
                          >
                            Rider Phone Number:
                          </Typography>
                          <Typography variant="body1" className="pt-1">
                            &nbsp; {delivery.riderDelivery?.rider.phone_number}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", color: "gray" }}
                          >
                            Rider Address:
                          </Typography>
                          <Typography variant="body1" className="pt-1">
                            &nbsp; {delivery.riderDelivery?.rider.address},{" "}
                            {delivery.riderDelivery?.rider.district}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", color: "gray" }}
                          >
                            Rider Types of Vehicles:
                          </Typography>
                          <Typography variant="body1" className="pt-1">
                            &nbsp;{" "}
                            {delivery.riderDelivery?.rider.typeOfVehicles}
                          </Typography>
                        </Grid>
                        |
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              </Grid>
            </>
          )}
        </Box>
      </div>
    </div>
  );
};

export default OrderDeliveryDetails;