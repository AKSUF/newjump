import React, { useEffect, useState } from "react";
import { getPersonalProfile } from "../../service/ProfileService";
import { getBuyProductSingleDetails } from "../../service/BuyProduct";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@mui/material";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { getAllProducer } from "../../service/AuthService";
import { showAllStore } from "../../service/StoreService";

const BuyProductDetails = () => {
  const { buyProductId } = useParams();
  const [buyProduct, setBuyProduct] = useState<any>();
  const token: any = localStorage.getItem("token");
  let roles: any = localStorage.getItem("authorization");
  let firstRole = JSON.parse(roles)[0];
  const [stores, setStores] = useState<any>([]);
  const [producer, setProducer] = useState<any>([]);

  useEffect(() => {}, []);
  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        showAllStore(token);

        console.log(res.data);
        getBuyProductSingleDetails(buyProductId, token)
          .then((res) => {
            console.log(res.data);
            setBuyProduct(res.data);
          })
          .catch((error) => {
            console.log(error);
          });

        getAllProducer(token)
          .then((res) => {
            console.log(res.data);
            setProducer(res.data);

            return;
          })
          .catch((error) => {
            toast.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Container maxWidth="xl" sx={{ boxShadow: "sm" }}>
        {buyProduct && (
          <Grid
            container
            mt={2}
            spacing={2}
            sx={{
              px: 4,
              pb: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} sx={{ textAlign: "right" }}></Grid>
            <Grid item md={6} xs={12} className="flex justify-center items-center">
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={`/api/v1/buy/buy-products/image/${buyProduct.image}`}
                  alt=""
                />
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <TableContainer sx={{ bgcolor: "grey.50" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {buyProduct.productName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        {firstRole === "STORE" ? (
                          <>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                              >
                                Producer
                              </Typography>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {
                                producer.find(
                                  (p: any) => p.id === buyProduct.producerId
                                )?.email
                              }
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                              >
                                Store
                              </Typography>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {buyProduct.store.store_name}
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Price
                          </Typography>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ color: "green.600", fontWeight: "bold" }}
                        >
                          {buyProduct.price}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Quantity
                          </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Typography>{buyProduct.howMuch}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Total Price:
                          </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {buyProduct.totalPrice}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Status
                          </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {buyProduct.status}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default BuyProductDetails;