import React, { useEffect, useState } from "react";
import { getPersonalProfile } from "../../service/ProfileService";
import {
  getAllProducerOrdersAcceptedRequests,
  rejectOrderRequest,
} from "../../service/BuyProduct";
import { toast } from "react-toastify";

import { Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeliveryStatus from "../../Utils/DeliveryStatus";
import { deliveryStatusChangeByProducer } from "../../service/Delivery";
import filteringProduct from "../../Utils/filteringProduct";

const AcceptedOrder = () => {
  const [requests, setRequests] = useState<any>();
  const token = localStorage.getItem("token");
  const [allDeliveryStaus, setAllDeliveryStaus] = useState<any>();

  const filterDeliverStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filteringProduct(e, setRequests, allDeliveryStaus);
  };

  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        console.log(res.data);

        getAllProducerOrdersAcceptedRequests(token)
          .then((res) => {
            setRequests(res.data);
            setAllDeliveryStaus(res.data);
            console.log(res.data);

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

  function changeDeliverStatus(request: any) {
    if (window.confirm("Do you want to approve the product?")) {
      deliveryStatusChangeByProducer(request.buyProductId, token)
        .then((res) => {
          console.log(res.data);
          window.location.reload();

          toast.success("You have successfully took the order 🌟");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in Approving the product");
        });
    }
  }

  function rejectShopKeeperOrderRequest(request: any) {
    if (window.confirm("Do you want to approve the product?")) {
      rejectOrderRequest(request.buyProductId, token)
        .then((res) => {
          console.log(res.data);
          toast.success("Rejected");

          let newProductContent = request.filter(
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

  return (
    <div className="m-10 md:m-4">
      <Table className="border">
        <TableHead style={{ backgroundColor: "#d86356" }}>
          <TableRow>
            <TableCell
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                border: "solid 2px white",
              }}
            >
              No
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: "18px",
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
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                border: "solid 2px white",
              }}
            >
              Store Name
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                border: "solid 2px white",
              }}
            >
              Quantity
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                border: "solid 2px white",
              }}
            >
              Price
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                border: "solid 2px white",
              }}
            >
              Total Price
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                border: "solid 2px white",
              }}
            >
              Delivery Status
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: "18px",
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
          {requests != undefined
            ? requests.map((request: any, index: any) => (
                <TableRow
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ECECEC")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                >
                  <TableCell className="border" style={{ textAlign: "center" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell className="border" style={{ textAlign: "center" }}>
                    {request.productName}
                  </TableCell>
                  <TableCell className="border" style={{ textAlign: "center" }}>
                    {request.store.store_name}
                  </TableCell>

                  <TableCell className="border" style={{ textAlign: "center" }}>
                    {request.howMuch}
                  </TableCell>
                  <TableCell className="border" style={{ textAlign: "center" }}>
                    {request.price}
                  </TableCell>
                  <TableCell className="border" style={{ textAlign: "center" }}>
                    {request.totalPrice}
                  </TableCell>

                  <TableCell className="border" style={{ textAlign: "center" }}>
                    {request.deliveryStatus}
                  </TableCell>
                  <TableCell className="border" style={{ textAlign: "center" }}>
                    {request.deliveryStatus === DeliveryStatus.Pending ? (
                      <>
                        <Button
                          onClick={() => changeDeliverStatus(request)}
                          variant="contained"
                          color="primary"
                        >
                          Delivered
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="contained" color="primary" disabled>
                          Delivered
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            : ""}
        </TableBody>
      </Table>
    </div>
  );
};

export default AcceptedOrder;