import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  NativeSelect,
  TextField,
} from "@mui/material";
import { showAllStore } from "../../service/StoreService";
import { toast } from "react-toastify";
import {
  UploadImagesToBuyProducts,
  buyProductFronProducer,
  getAllShopKeeperRequest,
  removeBuyProductDetails,
} from "../../service/BuyProduct";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { getAllProducer } from "../../service/AuthService";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { getPersonalProfile } from "../../service/ProfileService";
import { Link } from "react-router-dom";
import RequestAcceptStatus from "../../Utils/RequestAcceptStatus";
import filteringProduct from "../../Utils/filteringProduct";
import ProductDialog from "../ProductDialog";
type Props = {
  role: String;
};
const BuyProduct = (props: Props) => {
  const { role } = props;
  let roles: any = localStorage.getItem("authorization");
  let firstRole = JSON.parse(roles)[0];
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [buyProduct, setBuyProduct] = useState({
    productName: "",
    howMuch: 0,
  
    producerId: "",
  });
  const [producer, setProducer] = useState<any>([]);
  const token = localStorage.getItem("token");
  const [imageFile, setImageFile] = useState();
  const [requests, setRequests] = useState<any>();
  const [formErrors, setFormErrors] = useState<any>({});
  const [allRequests, setAllRequests] = useState<any>();
   const [adminMessageDialogOpen, setAdminMessageDialogOpen] = useState(false);

  const handleOpenAdminMessageDialog = () => {
    setAdminMessageDialogOpen(true);
  };

  const handleCloseAdminMessageDialog = () => {
    setAdminMessageDialogOpen(false);
  };   


  const [preview, setPreview] = useState<string | null>(null);
  
  useEffect(() => {
   
    getAllProducer(token)
      .then((res) => {
        console.log(res.data);
        setProducer(res.data);

        return;
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

 
  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        console.log(res.data);

        getAllShopKeeperRequest(token)
          .then((res) => {
            setRequests(res.data);
            setAllRequests(res.data);
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
  const filterRequests = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filteringProduct(e, setRequests, allRequests);
  };

  const fieldChanged = (event: any) => {
    setBuyProduct({ ...buyProduct, [event.target.name]: event.target.value });
    console.log(buyProduct);
  };

  const handleSubmit = (event: any) => {
    const errors: any = {};
    event.preventDefault();
    if (buyProduct.productName.length <= 1) {
      toast.error("Please fill in all required Data");
      errors.buyProduct = {
        ...errors.buyProduct,
        productName: "Product Name is required",
        store_id: "Store ID is required",
      };
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    }
    if (buyProduct.productName.trim() === "") {
      toast.error("Store Name is Required");
      return;
    }

    buyProductFronProducer(buyProduct, token)
      .then((res) => {
        UploadImagesToBuyProducts(res.data.buyProductId, imageFile, token)
          .then((res) => {
            toast.success("Image uploaded");
          })
          .catch((error) => {
            toast.error("error in uploading image");
            console.log(error);
          });

        toast.success("Product Details Uploaded");
        console.log(buyProduct);
        setBuyProduct({
          productName: "",
          howMuch: 0,

        
          producerId: "",
        });
        handleClose();
      })
      .catch((error) => {
        toast.error("Product Details not  Uploaded due to some error !! ");
        console.log(error);
      });
  };
  const handleFileChage = (event: any) => {
    console.log(event.target.files[0]);
    setImageFile(event.target.files[0]);
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  function deleteBuyProductDetails(request: any) {
    if (window.confirm("Do you want to delete the product?")) {
      removeBuyProductDetails(request.buyProductId, token)
        .then((res) => {
          console.log(res.data);
          toast.success("Product details have been successfully deleted");

          let newProductContent = requests.filter(
            (m: any) => m.buyProductId !== request.buyProductId
          );
          setRequests([...newProductContent]);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    }
  }

  return (
    <div className="m-4">
      <button
        className="bg-blue-800 mb-5 p-2 mx-3 text-white rounded-md"
        onClick={handleOpen}
      >
        BUY PRODUCT
      </button>
      

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Buy Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details to buy a product.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="productName"
              label="Product Name"
              type="text"
              fullWidth
              required
              onChange={fieldChanged}
              value={buyProduct.productName}
              error={Boolean(formErrors.productName)}
              helperText={formErrors.productName}
            />
            <TextField
              margin="dense"
              name="howMuch"
              label="How Much (in kg/litre/pieces)"
              type="number"
              fullWidth
              required
              onChange={fieldChanged}
              value={buyProduct.howMuch}
            />
          

            <InputLabel id="producerId">Select Producer</InputLabel>
            <Select
              labelId="producerId"
              id="producerId"
              fullWidth
              required
              name="producerId"
              value={buyProduct.producerId}
              onChange={fieldChanged}
            >
              {producer.map((p: any) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.email}
                </MenuItem>
              ))}
            </Select>

            <label htmlFor="image" className="block mt-3 mb-2">
              <Button variant="contained" color="primary" component="span">
                Upload Image
              </Button>
            </label>

            <input
              accept="image/*"
              id="image"
              type="file"
              onChange={handleFileChage}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "50%",
                  height: "50%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Buy
          </Button>
        </DialogActions>
      </Dialog>
      
      <Grid container spacing={3}>
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
                    onChange={(e) => filterRequests(e)}
                  >
                    <option value={"all"}>All</option>
                    <option value={"PENDING"}>Pending</option>
                    <option value={"REQUEST_ACCEPTED"}>Request Accepted</option>
                    <option value={"NOT_AVAILABLE"}>Not Available</option>
                    
                  </NativeSelect>
                </FormControl>
              </Box>
            </Grid>
        {requests != undefined
          ? requests.map((request: any, index: any) => {
              const producerEmail = producer.find(
                (p: any) => p.id === request.producerId
              )?.email;
              return (
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
                          "/api/v1/buy/buy-products/image/" + request.image
                        }
                      />
                    </Box>
                    <CardContent>
                      <Typography gutterBottom>
                        <div className="m">
                          <span className="font-bold">Product Name:</span>:{" "}
                          {request.productName}
                        </div>
                        <div className="">
                          <span className="font-bold">Quantity:</span>:{" "}
                          {request.howMuch}
                        </div>
                        <div className="">
                          <span className="font-bold">Status:</span>:{" "}
                          {request.status == RequestAcceptStatus.Pending ? (
                            <>
                              <span className="text-blue-700 font-bold">
                                {request.status}
                              </span>
                            </>
                          ) : request.status ==
                            RequestAcceptStatus.Not_Available ? (
                            <>
                              <span className="text-red-700 font-bold">
                                {request.status}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-green-700 font-bold">
                                {request.status}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="">
                          <span className="font-bold">Producer Email:</span>:{" "}
                          {producerEmail}
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
                      <Box >
                        <Link
                          to={
                            `/${firstRole.toLowerCase()}/buy-product-details/` +
                            request.buyProductId
                          }
                        >
                           <Button variant="contained" color="success">Details</Button>
                        </Link>
                      </Box>
                      {firstRole === "STORE" ? (
                        <>
                          <Box>
                        
                            {request.deliveryStatus ===null?(<>
                            
                              <Button 
                              variant="contained"
                              color="primary"
                               onClick={handleOpenAdminMessageDialog}
                            >
                              Update
                            </Button>
                             <ProductDialog
                      open={adminMessageDialogOpen}
                      handleClose={handleCloseAdminMessageDialog}
                      request={request}
                      updateRequest={request.buyProductId}
                    />
                            
                            </>):(<></>)}

                            </Box>
                            <Box>
                            <Button
                              onClick={() => deleteBuyProductDetails(request)}
                              variant="contained"
                              color="error"
                            >
                              Remove
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <></>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          : ""}
      </Grid>
    </div>
  );
};

export default BuyProduct;