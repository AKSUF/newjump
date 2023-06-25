import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, ReactElement, forwardRef } from "react";
import DeliveryDetails from "./DeliveryDetails";
import { getPersonalProfile } from "../service/ProfileService";
import { deleteDeliverDetails, getDetailsByUser } from "../service/DeliveryDetails";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { getProductSingleDetails } from "../service/ProductService";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

const DeliverOrderAddress = () => {
  const { productId } = useParams();
  const { quantity } = useParams();
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [deliverDetails, setDeliverDetails] = useState<any>();
  const [product, setProduct] = useState<any>();
  const subTotalPrice = quantity ? product?.price * parseInt(quantity) : 0;


  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        console.log(res.data);
        getDetailsByUser(token)
          .then((res) => {
            setDeliverDetails(res.data);
            console.log( res.data);

            return;
          })
          .catch((error) => {
            console.log(error);
          });
         
          
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [opens, setOpens] = useState(false);
  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleCancel = () => {
    setOpens(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
 
  const handleClickDeliveryDetailsOpen = () => {
    setOpens(true);
  };

  function deleteDeliverDetail(deliverDetail: any) {
    if (window.confirm("Are you sure")) {
      deleteDeliverDetails(deliverDetail.delivery_details_id, token)
        .then((data) => {
          toast.success("Delivery Details deleted");
          let newProductContent = deliverDetail.filter(
            (d: any) => d.delivery_details_id != deliverDetail.delivery_details_id
          );
          setDeliverDetails([...newProductContent]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        setUser(res.data)
      
      console.log(res.data);
    getProductSingleDetails(productId, token)
      .then((res) => {

        console.log(res.data);
        setProduct(res.data);
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
    <div className="pb-72 mt-4">
      <Grid container spacing={3}>
        <Grid item xs={1} lg={1} md={1}>
          <p></p>
        </Grid>

        <Grid item xs={10} md={6} className=" mt-20 pt-5">
          <Grid container spacing={1}>
            <Grid item xs={12} lg={12} md={12} className=" mt-20 pt-5 flex justify-center">
              <Dialog
                open={opens}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCancel}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogActions>
                  <DeliveryDetails />
                </DialogActions>
              </Dialog>
              <button
                className="p-2 rounded-md bg-green-600 hover:bg-green-500 shadow-md shadow-green-300
          text-white"
                onClick={handleClickDeliveryDetailsOpen}
              >
                ADD Details
              </button>
            </Grid>

            {deliverDetails != undefined
              ? deliverDetails.map((deliverDetail: any, index: any) => (
                  <>
                    <Grid item xs={12}>
                      <Box textAlign="center">
                        <Box textAlign="center">
                          <Card
                            elevation={10}
                            className="rounded-none mt-5"
                            sx={{ display: "flex" }}
                          >
                            <Grid container spacing={1}>
                              <Grid item xs={8} className=" mt-20 pt-5">
                                <Box className="text-left md:mx-4 sm:mx-2 ">
                                  <CardContent sx={{ flex: "1 0 auto" }}>
                                    <Typography>
                                      <h2 className="md:text-[16px] sm:text-[14px] text-[12px]">
                                        <p className="text-[14px]">
                                          <span className="font-bold  ">
                                            Deliver to{" "}
                                          </span>
                                          {deliverDetail.name}
                                        </p>
                                        <p className="text-[14px]">
                                          {" "}
                                          <span className="font-bold">
                                            Phone Number:
                                          </span>
                                          {deliverDetail.phone_number}
                                        </p>
                                      </h2>
                                      <h3 className="md:text-[14px] sm:text-[14px] text-[12px]">
                                        <span className="font-bold  ">
                                          Delivery district:
                                        </span>

                                        {deliverDetail.district}
                                      </h3>
                                      <h3 className="md:text-[14px] sm:text-[14px] text-[12px]">
                                        <span className="font-bold  ">
                                          Delivery Address:
                                        </span>

                                        {deliverDetail.delivery_address}
                                      </h3>
                                    </Typography>
                                  </CardContent>
                                  <CardActions></CardActions>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={4}
                               
                               
                              >
                                <Grid container spacing={1}>
            <Grid item  lg={12}  className=" mt-20 pt-5 flex justify-end text-right">
                              

                                
                                  <Link
                                    to={
                                      `/user/edit-address/` +
                                      deliverDetail.delivery_details_id
                                    }
                                  >
                                    <button
                                  className="border-2 text-blue-600 mt-2 mr-6"
                                  
                                >
                                    <EditIcon />
                                    </button>
                                  </Link>
                                
                                <button className="border-2 text-red-600 mt-2 mr-6"
                                onClick={() => deleteDeliverDetail(deliverDetail)}
                                
                              >
                                <DeleteIcon />
                              </button>
                              </Grid>
                              <Grid item  lg={12}   className=" flex justify-start items-center">
                              <NavLink
                                    to={"/user/payment-process/"+ deliverDetail.delivery_details_id+"/"+productId+"/"+quantity}
                                  >
                                    <button className="bg-orange-700 mr-2 p-3 rounded-lg font-bold text-white w-[150px] text-[16px] hover:bg-orange-800 ">
                                      Order Now
                                    </button>
                                    
                                    
                                  </NavLink>


                              </Grid>









                              </Grid>
                              </Grid>
                            </Grid>
                          </Card>
                        </Box>
                      </Box>
                    </Grid>
                  </>
                ))
              : ""}

          </Grid>
        </Grid>

        


              <Grid item xs={12} md={4} className=" flex justify-center items-center">
                <Box className=" " textAlign="center">
                  <Grid container mt={0} spacing={1} className="">
                  {product && (
                        
                           
                           
                                      <Box textAlign="center">
                                        <Card
                                          elevation={8}
                                          className="rounded-none"
                                          sx={{ display: "flex" }}
                                        >
                                          <CardMedia
                                            component="img"
                                           
                                            className=" text-left "
                                            style={{
                                              backgroundSize: "cover",
                                              height: "200px",
                                              width: "50%",
                                            }}
                                            image={
                                              "/api/v1/producer/products/image/" +
                                              product.image
                                            }
                                           
                                          />
                                          <Box className="text-left w-9/12  ">
                                            <CardContent
                                              sx={{ flex: "1 0 auto" }}
                                            >
                                              <Typography>
                                                <h6 className=" font-bold sm:text-1xl text-[15px] text-gray-500">
                                                <p className="text-[17px]">
                                                    <span className="font-bold  ">
                                                    Product Name:{" "}
                                                    </span>
                                                    {product.productName}
                                                  </p>
                                                  
                                                  
                                                </h6>
                                              </Typography>
                                              <Typography>
                                                <h2 className="md:text-[16px] sm:text-[14px] text-[12px]">
                                                  <p className="text-[17px]">
                                                    <span className="font-bold  ">
                                                    Quantity:{" "}
                                                    </span>
                                                    {quantity}
                                                  </p>
                                                  <p className="text-[17px]  bg-green-400 py-2 px-1 text-red-800">
                                                    <span className="font-bold  ">
                                                   SubTotal Price:{" ৳ "}
                                                    </span>
                                                    { subTotalPrice}
                                                  </p>
                                                   <p className="text-[17px] text-xl bg-green-400 py-2 px-1 text-red-800">
                                                    <span className="font-bold  ">
                                                   Total Price:{" ৳ "}
                                                    </span>
                                                    { subTotalPrice + product.charge}
                                                  </p>
                                                  
                                                </h2>
                                               
                                              </Typography>
                                            </CardContent>
                                            <CardActions>
                                            
                                            </CardActions>
                                          </Box>
                                        </Card>
                                      </Box>
                                    
                                    
                                 
                         )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
    
    </div>
  );
};

export default DeliverOrderAddress;