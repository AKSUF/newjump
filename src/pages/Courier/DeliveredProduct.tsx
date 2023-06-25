import {
    Box,
    Button,
    Container,
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
    changeDeliStatus,
    deliveryByCouier,
  } from "../../service/Delivery";
  import { toast } from "react-toastify";
  import DeliveryStatus from "../../Utils/DeliveryStatus";
  import { Link } from "react-router-dom";
  
  const DeliveredProduct = () => {
    const token = localStorage.getItem("token");
    const [orders, setOrders] = useState<any>();
    const [user, setUser] = useState<any>();
  
    useEffect(() => {
      getPersonalProfile(token)
        .then((res) => {
          console.log(res.data);
          deliveryByCouier(token)
            .then((res) => {
              let pendingDelivery = res.data.filter(
                (delivery: any) => delivery.status === "DELIVERED"
              );
  
              setOrders(pendingDelivery);
  
              return;
            })
            .catch((error) => {
              console.log(error);
            });
          getPersonalProfile(token)
            .then((res) => setUser(res.data))
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);        });
    }, []);

    return (
      <div className="pt-5">
        <h1 className="text-2xl font-bold p-3 uppercase text-green-400 bg-gray-100 text-center">
          Delivered Order
        </h1>
  
        <Container maxWidth="xl">
          <div className="m-10 md:m-4">
            <Table className="border">
              <TableHead style={{ backgroundColor: "#7a6666" }}>
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
                            fontSize: "156x",
                          }}
                        >
                          {order.delivery_number}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          {order.product.productName}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          {order.deliveryDetails.name}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          {order.product.shippingAddress}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px",
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
                            fontSize: "16px",
                          }}
                        >
                          {order.paidOrPayable}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          $ {order.amount}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                      <span className="text-gray-600">  {order.status}</span>
                        </TableCell>
  
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          
                              <Button
                                variant="contained"
                                color="info"
                                sx={{ fontWeight: "bold" }}
                                
                              >
                                Details
                              </Button>
                              
                          
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
    

export default DeliveredProduct