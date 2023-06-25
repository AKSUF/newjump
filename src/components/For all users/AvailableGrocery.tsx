import React, { useEffect, useState } from 'react'
import {
    Box,
    Container,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Button,
  } from "@mui/material";
import { Link } from 'react-router-dom';

import { getPersonalProfile } from '../../service/ProfileService';

import { getAllProducts } from '../../service/ProductService';
import { toast } from 'react-toastify';
type Props = {
  role: String;
};

const AvailableGrocery = (props: Props) => {
  const { role } = props;
  const [products, setProducts] = useState<any>();
  const token: any = localStorage.getItem("token");



          useEffect(() => {
            getAllProducts(token)
              .then((res) => {
                const newArray = res.data
                .filter(
                  (product: any) => product.status === "Available"
                ).filter(
                    (product: any) => product.category === "Grocery").slice(-6);
                
                setProducts(newArray);
                return;
              })
              .catch((error) => {
                toast.error(error);
              });
           
             
          }, []);

  return (
    <div>
      <div className="py-3 bg-slate-100">
       
        <Container maxWidth="xl" className="pb-5">
          <div className="lg:px-5">
            <Box margin={2} py={1}>
              <Grid container spacing={4}>
                <Grid item lg={6} sm={6} xs={8}>
                  <div className="text-left">
                    <h1 className="text-xl font-bold">Grocery</h1>
                  </div>
                </Grid>
                <Grid item lg={6} xs={4}>
                  <div className="text-right">
                  <Link to="/member/meals">
                      View All
                      </Link>
                  </div>
                </Grid>
              </Grid>
              <div style={{ borderTop: "2px solid gray " }}></div>
            </Box>
          </div>
          <div className="lg:px-5">
              <Box>
                <Grid container spacing={2}>
                  {products != undefined
                    ? products.map((product: any, index: any) => (
                        <Grid item xl={2} lg={2} md={4} sm={4} xs={6}>
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
                                  height: "150px",
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
                              
                              </Typography>
                              <Typography
                                className="text-xl"
                                color="text.secondary"
                              >
                                <h2 className='font-bold'>{product.productName}</h2>
                                <h3> $ {product.price}</h3>
                              </Typography>
                            </CardContent>
                            <CardActions
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                              }}
                            >
                             {role ===""?(<>
                             
                              <Link
                                to={
                                  `/product-details/` +
                                  product.productId
                                }
                              >
                                <Button variant='contained' color='success'>Details</Button>
                              </Link>
                             </>):(<><Link
                                to={
                                  `/${role.toLowerCase()}/product-details/` +
                                  product.productId
                                }
                              >
                                <Button variant='contained' color='success'>Details</Button>
                              </Link></>)}
                          

                              
                            </CardActions>
                          </Card>
                        </Grid>
                      ))
                    : ""}
                </Grid>
              </Box>
            
          </div>
        </Container>
      </div>
      </div>
  )
}

export default AvailableGrocery