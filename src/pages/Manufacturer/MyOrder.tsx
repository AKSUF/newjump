import React, { ChangeEvent, useEffect, useState } from "react";
import { getPersonalProfile } from "../../service/ProfileService";
import {
  acceptOrederRequest,
  getAllProducerOrdersFromFhopkeepers,
  rejectOrderRequest,
} from "../../service/BuyProduct";
import { toast } from "react-toastify";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

import { Link } from "react-router-dom";

const MyOrder = () => {
  const [requests, setRequests] = useState<any>();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState(0.0);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        console.log(res.data);

        getAllProducerOrdersFromFhopkeepers(token)
          .then((res) => {
            let statusNotAvailable = res.data.filter((req: any) => req.status !== "NOT_AVAILABLE");
          
            setRequests(statusNotAvailable);
            console.log(statusNotAvailable);
            // setRequests(res.data);
            // console.log(res.data);

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

  function rejectShopKeeperOrderRequest(request: any) {
    if (window.confirm("Do you want to approve the product?")) {
      rejectOrderRequest(request.buyProductId, token)
        .then((res) => {
          console.log(res.data);
          toast.success("Rejected");
          
          let newProductContent = requests.filter(
            (m: any) => m.buyProductId !== request.buyProductId
          );
          setRequests([...newProductContent]);
         
        }) 
        .catch((error) => {
          console.log(error);
          toast.error("Error in Approving the product");
        });
    }
  }

  const handleAcceptOrder = (request: any) => {
    // Make an API call to send the message to the Shopkeeper
    acceptOrederRequest(request.buyProductId, message, price, token)
      .then((response) => {
        // Display a success message to the user
        console.log(response.data);
        toast.success("Message sent to Shopkeeper");
        
        handleClose();
      })
      .catch((error) => {
        // Display an error message to the user
        console.log(error);
        toast.error("Error sending message to seller");
      });
      let newProductContent = requests.filter(
          (m: any) => m.buyProductId !== request.buyProductId
        );
        setRequests([...newProductContent]);
  };

  return (
    <div className="m-10 md:m-4">
      <h1 className="text-2xl text-center my-2 p-2 bg-slate-500 text-white font-bold ">
        ORDERS
      </h1>
      <Grid container spacing={3}>
        {requests != undefined
          ? requests.map((request: any, index: any) => (
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
                      image={"/api/v1/buy/buy-products/image/" + request.image}
                    />
                  </Box>
                  <CardContent>
                    <Typography gutterBottom>
                      <div className="md:text-xl">
                        <span className="font-bold">Product Name:</span>{" "}
                        {request.productName}
                      </div>
                      <div className="md:text-xl">
                        <span className="font-bold">Quantity:</span>{" "}
                        {request.howMuch}
                      </div>
                      <div className="md:text-xl">
                        <span className="font-bold">Status:</span>{" "}
                        {request.status}
                      </div>
                      <div className="md:text-xl">
                        <span className="font-bold">Store Name:</span>{" "}
                        {request.store.store_name}
                      </div>
                      <div className="md:text-xl">
                        <span className="font-bold">Store Name:</span>{" "}
                        {request.user.name}
                      </div>
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
                    <Box sx={{ display: "flex", gap: "16px" }}>
                      <Button
                        onClick={handleOpen}
                        variant="contained"
                        color="primary"
                      >
                        Accept
                      </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Accept Request</DialogTitle>
                        <DialogContent>
                          <TextField
                            label="Message"
                            fullWidth
                            margin="normal"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="price"
                            label="Price"
                            fullWidth
                            type="number"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setPrice(parseFloat(e.target.value))
                            }
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleAcceptOrder(request)}
                            color="primary"
                          >
                            Accept
                          </Button>
                        </DialogActions>
                      </Dialog>

                     
                      <Button   onClick={() => rejectShopKeeperOrderRequest(request)} variant="contained" color="error">
                        Reject
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))
          : ""}
      </Grid>
    </div>
  );
};

export default MyOrder;