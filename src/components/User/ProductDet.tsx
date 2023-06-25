import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
import {
  deleteProducts,
  getProductSingleDetails,
} from "../../service/ProductService";
import { deleteComment, sendMessages } from "../../service/MessageService";
import { addToCart } from "../../service/AddToCartService";
import { getPersonalProfile } from "../../service/ProfileService";
import AdminMessageDialog from "../Admin/AdminMessageDialog";
import {
  adminSendMsgToSeller,
  approveProduct,
  rejectProducts,
} from "../../service/AdminService";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AdminStatus from "../../Utils/AdminStatus";
type Props = {
  role: String;
};

function ProductDet(props: Props) {
  const { role } = props;
  const { productId } = useParams();
  const [product, setProduct] = useState<any>();
  const navigate = useNavigate();
  const [comment, setComment] = useState({ text: "" });
  const [comments, setComments] = useState<any>();
  const [user, setUser] = useState<any>();
  const [quantity, setQuantity] = useState(1);
  const [adminMessage, setAdminMessage] = useState("");

  const [adminMessageDialogOpen, setAdminMessageDialogOpen] = useState(false);

  const handleOpenAdminMessageDialog = () => {
    setAdminMessageDialogOpen(true);
  };

  const handleCloseAdminMessageDialog = () => {
    setAdminMessageDialogOpen(false);
  };


  const token: any = localStorage.getItem("token");

  useEffect(() => {
    getPersonalProfile(token)
    .then((res) => {
      setUser(res.data);

      console.log(res.data);
      getProductSingleDetails(productId, token)
        .then((res) => {
          console.log(res.data);
          setProduct(res.data);
        })
        .catch((error) => {
          console.log(error);
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });

        getProductSingleDetails(productId, token)
          .then((res) => {
            console.log(res.data);
            setProduct(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
  }, []);
  // const printDate = (numbers: any) => {
  //   return new Date(numbers).toLocaleString();
  // };
  const handleSubmitAdminMessage = (message: any) => {
    adminSendMsgToSeller(message, productId, token).then((res) => {
      toast.success("Message Sent Successfully");
    });
    console.log(message);
  };

  const printDate = (numbers: any, options: any = {}) => {
    const { day = 'numeric', month = 'short' } = { ...options };
    const date = new Date(numbers);
    return date.toLocaleDateString('en-US', { day, month });
  };

  function deleteProduct(product: any) {
    if (window.confirm("Are you sure")) {
      deleteProducts(product.productId, token)
        .then((res) => {
          console.log(res.data);
          toast.success("Product Details is delete");
          navigate(`/${role.toLowerCase()}/product`);
          let newCarContent = product.filter(
            (m: any) => m.productId != product.productId
          );
          setProduct([...newCarContent]);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in deleting Product Details");
        });
    }
  }

  function approveProducts(product: any) {
    if (window.confirm("Do you want to approve the product?")) {
      approveProduct(productId, token)
        .then((res) => {
          console.log(res.data);
          toast.success("The product is approved");
          let newProductContent = product.filter(
            (m: any) => m.productId !== product.productId
          );
          setProduct([...newProductContent]);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in Approving the product");
        });
    }
  }
  function deleteComments(comment: any) {
    if (window.confirm("Are you sure")) {
      deleteComment(comment.comment_id, token)
        .then((data) => {
          console.log(data);
          toast.success("Meal Details is delete");
          navigate(`/${role.toLowerCase()}/product-details/` + productId);
          let newCarContent = comment.filter(
            (m: any) => m.comment_id != comment.comment_id
          );
          setComments([...newCarContent]);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in deleting post");
        });
    }
  }

  function userAddToCart(product: any) {
    getPersonalProfile(token)
      .then((res) => {
        const user = res.data;

        addToCart(product.productId, token)
          .then((data) => {
            console.log(data);
            toast.success("Cart Addedd Successfully");
            navigate("/user/product-details/" + productId);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in Adding cart");
          });
      })
      .catch((error) => {
        toast.error("Error While Fetching, Please retry later!");
      });
  }

  const postMessage = () => {
    if (comment.text.trim() === "") {
      return;
    }

    sendMessages(comment, product.productId, token)
      .then((data) => {
        toast.success("Comment Added");
        setProduct({
          ...product,
          comments: [...product.comments, data.data],
        });
        setComment({
          text: "",
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((preCount) => preCount - 1);
    }
  };

  const handleIncrement = () => {
    if (product.availableQuantity > quantity + 1) {
      setQuantity((preCount) => preCount + 1);
    }
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSendMessage = () => {
    // Make an API call to send the message to the seller
    rejectProducts(productId, adminMessage, token)
      .then((response) => {
        // Display a success message to the user
        console.log(response.data);
        toast.success("Message sent to seller");
        handleClose();
      })
      .catch((error) => {
        // Display an error message to the user
        console.log(error);
        toast.error("Error sending message to seller");
      });
  };

  const [showOption, setShowOption] = useState(false);
  const handleClick = () => {
    setShowOption(!showOption);
  };

  return (
    <div className="bg-gray-50">
      <div className="mb-0 l  md:pb-48 pb-14">
        <h1 className="text-center font-bold text-xl py-2 underline uppercase font-serif underline-offset-4  bg-gray-50">
          Product Details
        </h1>
        
        <Container maxWidth="xl" className="shadow-sm">
          {product && (
            <Grid
              container
              mt={2}
              spacing={2}
              className="  px-4 pb-10 justify-between items-center"
            >
              <Grid item xs={12} className="inline-block text-right ">
                {" "}
                
                {role === "ADMIN" ? (
                  <>
                    <button
                      className="bg-sky-700 p-2 mx-3 text-white rounded-md"
                      onClick={handleOpenAdminMessageDialog}
                    >
                      Send message to seller
                    </button>
                    <AdminMessageDialog
                      open={adminMessageDialogOpen}
                      onClose={handleCloseAdminMessageDialog}
                      onSubmit={handleSubmitAdminMessage}
                    />
                    {product.adminStatus === AdminStatus.Approve? <>
                      <button
                      className="bg-red-700 p-2 mx-3 text-white rounded-md"
                      onClick={handleOpen}
                    >
                      Reject
                    </button>
                    </>:<>
                    <button
                      className="bg-green-700 p-2 mx-3 text-white rounded-md"
                      onClick={() => approveProducts(product.productId)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-700 p-2 mx-3 text-white rounded-md"
                      onClick={handleOpen}
                    >
                      Reject
                    </button>
                    </>}
                    

                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Send Message to Seller</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Enter your message below:
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="admin-message"
                          label="Admin Message"
                          type="text"
                          value={adminMessage}
                          onChange={(e: any) => setAdminMessage(e.target.value)}
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleSendMessage} color="primary">
                          Send
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                ) : (
                  <></>
                )}
                <div className="inline-block">
                {role === "STORE"|| role === "ADMIN" ?(
                  <>
                  
                  <div
                onClick={handleClick}
                className="lg:p-4 relative "
                x-data="{dropdownIpen:false}"
              >
                <MoreVertIcon className="inline-block ml-0 cursor-pointer " />
              
                {showOption && (
                  <div className="md:absolute mt-2 bg-gray-100 border-black border-1 shadow-red-900 shadow p-2 rounded-lg  right-0">
                    <ul className="space-y-2 md:w-24 text-left font-bold">
                      <li className="lg:p-2 md:p-2 text-sky-600 border-b border-gray-600 dark:hover:text-blue-900">
                      <Link
                      to={
                        `/${role.toLowerCase()}/update-product/` +
                        product.productId
                      }
                    >
                      {" "}
                    <BorderColorIcon /> EDIT
                    </Link>
                      </li>

                      <li className="lg:p-2 md:px-2 text-red-600 dark:hover:text-red-900">
                      <button 
                      onClick={() => deleteProduct(product)}
                    ><DeleteIcon />
                      Delete
                    </button> 
                      </li>
                    </ul>
                  </div>
                )}
              </div>
                  
                  </>
                ) : (
                  <></>
                )}
                </div>
              </Grid>
              <Grid item md={5} xs={12}>
                <Box className="" textAlign="center">
                  <img
                    className=" sm:w-[70%] w-[60%] md:h-80 lg:h-96 text-center inline-block"
                    src={"/api/v1/producer/products/image/" + product.image}
                    alt=""
                  />
                </Box>
              </Grid>
              <Grid item md={7} xs={12} className="bg-gray-100  bg-opacity-5">
                <Box textAlign="center">
                  <TableContainer>
                    <Table className="border ">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <p className="font-bold text-[16px]">Name</p>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {product.productName}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-bold  text-[16px]">
                            <p className="font-bold text-[16px]">Category</p>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {product.category}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-bold  text-[16px]">
                            <p className="font-bold text-[16px]">Price</p>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className="text-green-600 font-bold"
                          >
                            {product.price}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-bold  text-[16px]">
                            <p className="font-bold text-[16px]">Delivery</p>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <p> Standered delivery, within 7 days</p>
                            <p> $ {product.charge}</p>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-bold  text-[16px]">
                            <p className="font-bold text-[16px]">Status</p>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className="text-green-600 font-bold"
                          >
                            {product.status}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-bold  text-[16px]">
                            <p className="font-bold text-[16px]">Description</p>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {product.product_desc}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell colSpan={2} align="center">
                            <div
                              className="flex text-center"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Box sx={{ display: "flex" }}>
                                <IconButton onClick={handleDecrement}>
                                  <IndeterminateCheckBoxIcon />
                                </IconButton>
                                <div className="text-[20px]  pt-2">
                                  {quantity}
                                </div>
                                <IconButton onClick={handleIncrement}>
                                  <AddBoxIcon />
                                </IconButton>
                              </Box>
                            </div>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell
                            colSpan={2}
                            align="center"
                            style={{ borderBottom: "0px" }}
                          >
                            <div
                              className="flex text-center"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {token?.length > 0 && role === " " ? (
                                <>
                                  <NavLink to="/register">
                                    <button className="bg-orange-700 mr-2 p-3 rounded-lg font-bold text-white w-[150px] text-[16px] hover:bg-orange-800 ">
                                      Register To Order
                                    </button>
                                  </NavLink>
                                </>
                              ) : (
                                <>
                                  <NavLink
                                    to={
                                      "/user/delivery-form/" +
                                      productId +
                                      "/" +
                                      quantity
                                    }
                                  >
                                    <button className="bg-orange-700 mr-2 p-3 rounded-lg font-bold text-white w-[150px] text-[16px] hover:bg-orange-800 ">
                                      Order Now
                                    </button>
                                  </NavLink>

                                  <button
                                    onClick={() => userAddToCart(product)}
                                    className="bg-sky-700 mr-2 p-3 rounded-lg font-bold text-white w-[150px] text-[16px] hover:bg-sky-800"
                                  >
                                    Add To Cart
                                  </button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
            </Grid>
          )}

          <div>
            <div className="mt-4">
              <Container>
                <h1 className="text-center text-xl uppercase font-bold mb-3 mt-4">
                  Comment ({product ? product.comments.length : 0})
                </h1>

                <Grid>
                  <Grid spacing={1}>
                    <Grid xl={12} lg={12} md={12} xs-={12}>
                      <Grid container spacing={1} className="flex items-center">
                        <Grid item lg={11} xs={12}>
                          <textarea
                            value={comment.text}
                            className="w-full border-2 p-3 h-16 rounded-3xl hover:outline-none"
                            onChange={(event: any) =>
                              setComment({ text: event.target.value })
                            }
                            placeholder="Enter Your Message Here"
                          />
                        </Grid>
                        <Grid lg={1} xs={12}>
                          <Box className=" m-1  items-center mb-2 text-center">
                            <Button variant="contained" onClick={postMessage}>
                              Post
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <hr className="mt-4"></hr>
                    <Grid xs-={12}>
                      {product?.comments?.map((c: any, index: any) => (
                        <Box className="mt-4 bg-gray-400">
                          <Card key={index}>
                            <Grid
                              container
                              spacing={1}
                              className="flex items-center"
                            >
                              <Grid item lg={11} xs={11}>
                                <CardContent>
                                  <Typography>
                                    <span className="text-[10px]">
                                      {printDate(c.commentDate)}
                                    </span>
                                  </Typography>
                                  <Typography>
                                    <span className="font-bold text-[16px] text-gray-500">
                                      {c.user.name}
                                    </span>
                                    {":  "}
                                    {c.text}
                                  </Typography>
                                </CardContent>
                              </Grid>
                              <Grid item lg={1} xs={1}>
                                {user && user.user_id === c.user.user_id ? (
                                  <Box bgcolor="" className=" text-left ">
                                    <button
                                      onClick={() => deleteComments(c)}
                                      className="hover:text-red-700 outline-none"
                                    >
                                      <DeleteIcon className="border text-red-600 mr-3" />
                                    </button>
                                  </Box>
                                ) : (
                                  ""
                                )}
                              </Grid>
                            </Grid>
                          </Card>
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default ProductDet;