import React, { useEffect, useState } from "react";
import { getPersonalProfile } from "../../service/ProfileService";
import { myOrders } from "../../service/Delivery";
import { toast } from "react-toastify";
import {
  Grid,
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeliveryStatus from "../../Utils/DeliveryStatus";
const MyOrders = () => {
  const token = localStorage.getItem("token");
  const [deliveries, setDeliveries] = useState<any>();

  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        console.log(res.data);

        myOrders(token)
          .then((res) => {
            setDeliveries(res.data);
            console.log(res.data);

            return;
          })
          .catch((error) => {
            toast.error(error);
          });
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);
  return (
    <div className="py-4 mt-6 px-1 min-h-screen">
      <h1 className="text-xl font-bold text-center p-6">My Orders</h1>
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              {deliveries != undefined ? (
                <Grid container spacing={2}>
                  {deliveries.map((delivery: any) => (
                    <Grid item md={6} xs={12} key={delivery.delivery_id}>
                      <Box className="bg-gray-200 mt-4">
                        <Card elevation={1} className="rounded-none">
                          <Box sx={{ display: { md: "flex", xs: "block" } }}>
                            <CardMedia
                              component="img"
                              sx={{
                                width: { md: 350, xs: "100%" },
                                height: { md: 200, xs: 250 },
                              }}
                              image={
                                "/api/v1/producer/products/image/" +
                                delivery.product.image
                              }
                            />
                            <CardContent
                              sx={{
                                flex: { md: "1 0 auto", xs: "none" },
                                textAlign: { md: "left", xs: "center" },
                                paddingTop: { md: "inherit", xs: 2 },
                              }}
                            >
                              <Typography
                                sx={{ display: { md: "block", xs: "inline" } }}
                              >
                                <h6 className=" font-bold sm:text-1xl text-[15px] text-gray-500">
                                  <p className="text-[17px]">
                                    <span className="font-bold  ">
                                      Product Name:{" "}
                                    </span>
                                    {delivery.product.productName}
                                  </p>
                                  <p className="text-[17px]">
                                    <span className="font-bold  ">
                                      Category:{" "}
                                    </span>
                                    {delivery.product.category}
                                  </p>
                                  <p className="text-[17px]">
                                    <span className="font-bold  ">Price </span>${" "}
                                    {delivery.product.price}
                                  </p>
                                  <p className="text-[17px]">
                                    <span className="font-bold  ">
                                      Total Amount:{" "}
                                    </span>
                                    $ {delivery.amount}
                                  </p>
                                  <p className="text-[17px]">
                                    <span className="font-bold  ">
                                      Status:{" "}
                                    </span>
                                    {delivery.status ===
                                    DeliveryStatus.Pending ? (
                                      <>
                                        <span className=" text-orange-400">
                                          PENDING{" "}
                                        </span>
                                      </>
                                    ) : delivery.status ===
                                      DeliveryStatus.AcceptForDeliver ? (
                                      <>
                                        <span className=" text-orange-400">
                                          PENDING{" "}
                                        </span>
                                      </>
                                    ) : delivery.status ===
                                      DeliveryStatus.OutForDeliver ? (
                                      <>
                                        <span className=" text-blue-400">
                                          OUT FOR DELIVERY{" "}
                                        </span>
                                      </>
                                    ) : delivery.status ===
                                      DeliveryStatus.Arrived ? (
                                      <>
                                        <span className=" text-red-700">
                                          ARRIVED{" "}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span className=" text-green-500">
                                          DELIVERED{" "}
                                        </span>
                                      </>
                                    )}
                                  </p>
                                </h6>
                                <Link
                                  to={`/user/cash-on-delivery/${delivery.delivery_id}`}
                                >
                                  <Button variant="contained" color="primary">
                                    More
                                  </Button>
                                </Link>
                              </Typography>
                            </CardContent>
                          </Box>
                        </Card>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MyOrders;