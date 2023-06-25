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
import { getPersonalProfile } from "../service/ProfileService";
import { getAllPendingProducts } from "../service/AdminService";
import filteringProduct from "../Utils/filteringProduct";
import { deleteProducts } from "../service/ProductService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



type Props = {
  role: String;
};

const PendingProducts = (props: Props) => {
  const { role } = props;
  let roles: any = localStorage.getItem("authorization");
  let firstRole = JSON.parse(roles)[0];
  const [allProducts, setAllProducts] = useState<any>();
  const [products, setProducts] = useState<any>();
  const token: any = localStorage.getItem("token");

  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        const user = res.data;
        if (role === "ADMIN") {
          getAllPendingProducts(token)
            .then((res) => {
              setProducts(res.data);
              setAllProducts(res.data);
              return;
            })
            .catch((error) => {
              toast.error(error);
            });
        }

        if (role === "STORE") {
          getAllPendingProducts(token)
            .then((res) => {
              let storeProduct = res.data.filter(
                (product: any) => product.user.user_id === user.user_id
              );
              setProducts(storeProduct);
              setAllProducts(storeProduct);
              return;
            })
            .catch((error) => {
              toast.error(error);
            });
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const filterProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filteringProduct(e, setProducts, allProducts);
  };
  function deleteProduct(product: any) {
    if (window.confirm("Are you sure")) {
      deleteProducts(product.productId, token)
        .then((data) => {
          toast.success("Meal Details is delete");
          let newProductContent = products.filter(
            (p: any) => p.productId != product.productId
          );
          setProducts([...newProductContent]);
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
                  {products != undefined
                    ? products.map((product: any, index: any) => (
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
                                  product.image
                                }
                              />
                            </Box>
                            <CardContent>
                              <Typography gutterBottom>
                                <div className="md:text-xl">
                                  <span className="font-bold">Category</span>:{" "}
                                  {product.category}
                                </div>
                              </Typography>
                              <Typography
                                className="text-xl"
                                color="text.secondary"
                              >
                                <h2>{product.productName}</h2>
                                <h3> {product.status}</h3>
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
                                    product.productId
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
                                       {firstRole === "STORE" ? (
                                  <>

<Link
                                  to={
                                    `/${firstRole.toLowerCase()}/update-product/` +
                                    product.productId
                                  }
                                >
                                        <button className="border m-1 p-1 text-sky-500">
                                          {" "}
                                          <EditIcon />
                                        </button>
                                      </Link>

                                      <button
                                        className="border m-1 text-red-500"
                                        onClick={() => deleteProduct(product)}
                                        
                                      >
                                        <DeleteIcon />
                                      </button>
                                      </>
                                       ) : (
                                        <></>
                                      )} 
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

export default PendingProducts;