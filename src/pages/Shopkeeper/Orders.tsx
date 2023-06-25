import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getPersonalProfile } from "../../service/ProfileService";
import { getStoreProducts } from "../../service/StoreService";
import filteringProduct from "../../Utils/filteringProduct";
import { deleteProducts } from "../../service/ProductService";
import { getOrderProducts } from "../../service/Delivery";



type Props = {
  role: String;
};

const Orders = (props: Props) => {
  const { role } = props;
  let roles: any = localStorage.getItem("authorization");
  let firstRole = JSON.parse(roles)[0];
  const [allProducts, setAllProducts] = useState<any>();
  const [deliverys, setDelivery] = useState<any>();
  const token: any = localStorage.getItem("token");

  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        const user = res.data;
      
        getOrderProducts(token)
            .then((res) => {
                setDelivery(res.data);
              setAllProducts(res.data);
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

  const filterProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filteringProduct(e, setDelivery, allProducts);
  };
  function deleteProduct(product: any) {
    if (window.confirm("Are you sure")) {
      deleteProducts(product.productId, token)
        .then((data) => {
          toast.success("Meal Details is delete");
          let newProductContent = deliverys.filter(
            (p: any) => p.productId != product.productId
          );
          setDelivery([...newProductContent]);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in deleting post");
        });
    }
  }

  return (
    <div className="sm:m-4 ">
      <div className="mb-10">
        <h3 className="pt-2 text-2xl font-bold text-center underline ">
          Product
        </h3>
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box pt={6}>
                <FormControl className="w-[200px] ">
                  <InputLabel
                    className="text-xl"
                    variant="standard"
                    htmlFor="uncontrolled-native"
                  >
                    Product Type
                  </InputLabel>
                  <NativeSelect
                    defaultValue={"all"}
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native",
                    }}
                    onChange={(e) => filterProduct(e)}
                  >
                    <option value={"all"}>All</option>
                    <option value={"Bag"}>Bag</option>
                    <option value={"Makeup"}>Makeup</option>
                    <option value={"Grocery"}>Grocery</option>
                    <option value={"Electronic"}>Electronic</option>
                    <option value={"Fruit"}>Fruit</option>
                    <option value={"Flower shop<"}>Flower shop</option>
                    <option value={"Machinery"}>Machinery</option>
                    <option value={"Book Shop"}>Book Shop</option>
                    <option value={"Furniture Shop"}>Furniture Shop</option>
                    <option value={"Toys Shop"}>Toys Shop</option>
                  </NativeSelect>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box p={1}>
                <Grid container spacing={3}>
                  {deliverys != undefined
                    ? deliverys.map((order: any, index: any) => (
                        <Grid item xl={3} lg={4} md={6} xs={6}>
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
                                  height: "200px",
                                  width: "100%",
                                }}
                                image={
                                  "/api/v1/producer/products/image/" +
                                  order.product.image
                                }
                              />
                            </Box>
                            <CardContent>
                              <Typography gutterBottom>
                                <div className="md:text-xl">
                                  <span className="font-bold">Category</span>:{" "}
                                  {order.product.productName}
                                </div>
                              </Typography>
                              <Typography
                                className="text-xl"
                                color="text.secondary"
                              >
                                <h2>{order.product.productName}</h2>
                                <h3> <span className="font-bold">Price: </span>${order.product.price}</h3>
                                <h3>  <span className="font-bold">Shipping Address: </span>{order.product.shippingAddress}</h3>
                                <h3>  <span className="font-bold">Delivery Status: </span>{order.status}</h3>
                                <h3>  <span className="font-bold">Order By: </span>{order.deliveryDetails.name}</h3>
                                <h3>  <span className="font-bold">Delivery By:</span>{order.riderDelivery?.rider.name}</h3>
                              </Typography>
                            </CardContent>
                            <CardActions
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                              }}
                              className="font-bold"
                            >
                              <Grid container>
                                    <Grid item xs={6}>
                                    <Link
                                  to={
                                    `/${firstRole.toLowerCase()}/product-details/` +
                                    order.product.productId
                                  }
                                >
                                        <Button
                                          variant="contained"
                                          color="primary"
                                        >
                                          {" "}
                                          Details
                                        </Button>
                                      </Link>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={6}
                                      display={"flex"}
                                      justifyContent={"right"}
                                    >
                                       
                                    </Grid>
                                  </Grid>
                         
                            </CardActions>
                          </Card>
                        </Grid>
                      ))
                    : ""}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Orders