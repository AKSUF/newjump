import {
    Box,
    Button,
    Container,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { getPersonalProfile } from "../../service/ProfileService";
  import {
    RiderDistrictBasedOrderDelivery,
    allRiderDeliveryDetails,
    allRiders,
    changeDeliStatus,
    deliveryByCouier,
  } from "../../service/Delivery";
  import { toast } from "react-toastify";
  import DeliveryStatus from "../../Utils/DeliveryStatus";
  import { Link } from "react-router-dom";
  
  const ShippingCourier = () => {
    const token = localStorage.getItem("token");
    const [orders, setOrders] = useState<any>();
  
    useEffect(() => {
      getPersonalProfile(token)
        .then((res) => {
          const user = res.data;
          console.log(res.data);
          deliveryByCouier(token)
            .then((res) => {
              setOrders(res.data);
  
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
  
    const takeOrder = (e: any, order: any) => {
      changeDeliStatus(order.delivery_id, token, order.status)
        .then((res) => {
          window.location.reload();
          toast.success("You have successfully took the order 🌟");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return (
      <div className="pt-5">
        <h1 className="text-2xl font-bold p-3 uppercase  bg-gray-200 text-center">
          Latest Order
        </h1>
  
        <Container maxWidth="xl">
          <div className="m-10 md:m-4">
            <Table className="border">
              <TableHead style={{ backgroundColor: "#867760" }}>
                <TableRow>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Delivery Number
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Order By
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Shipping Address
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Delivery By
                  </TableCell>
                  
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Customer Address
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Paid Or Payable
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Total amount
                  </TableCell>
  
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders != undefined
                  ? orders.map((order: any, index: any) => (
                      <TableRow
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#ECECEC")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "")
                        }
                      >
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {order.delivery_number}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {order.product.productName}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {order.status === DeliveryStatus.Pending ? (
                            <>
                          <h1 className="text-sky-700 font-bold">PENDING</h1>
                            </>
                          ):(order.status === DeliveryStatus.AcceptForDeliver ? (
                            <>
                              <h1 className="text-blue-700 font-bold">ACCEPT FOR DELIVERY</h1>
                            </>
                          ):(order.status === DeliveryStatus.OutForDeliver ? (<>
                          <h1 className="text-yellow-700 font-bold">OUT FOR DELIVERY</h1>
  
                          </>):(order.status === DeliveryStatus.Arrived ? (<>
                            <h1 className="text-purple-800 font-bold">ARRIVED</h1>
                          </>):(<>
                            <h1 className="text-green-700 font-bold">DELIVERED</h1>
                          </>)
  
                          )))}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {order.deliveryDetails.name}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {order.product.shippingAddress}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {order.riderDelivery?.rider.name}
                        </TableCell>
                      
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {order.deliveryDetails.delivery_address} ,{" "}
                          {order.deliveryDetails.district}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {order.paidOrPayable}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          $ {order.amount}
                        </TableCell>
  
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          <Box display={"flex"}>
                            <Box mx={1}>
                              <Link
                                to={`/rider/order-details/${order.delivery_id}`}
                              >
                                <Button
                                  variant="contained"
                                  color="info"
                                  sx={{ fontWeight: "bold" }}
                                  onClick={(e) =>
                                    takeOrder(e, DeliveryStatus.AcceptForDeliver)
                                  }
                                >
                                  Details
                                </Button>
                              </Link>
                            </Box>
                            <Box mx={1}></Box>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  : ""}
              </TableBody>
            </Table>
          </div>
        </Container>
      </div>
    );
  };
  
  
export default ShippingCourier