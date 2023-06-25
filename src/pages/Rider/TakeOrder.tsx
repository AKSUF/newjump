import React from "react";
import { changeDeliStatus } from "../../service/Delivery";
import { toast } from "react-toastify";
import DeliveryStatus from "../../Utils/DeliveryStatus";
import { Box, Button } from "@mui/material";
type Props = {
    delivery_id: any;
  status: any;
};

export const TakeOrder = (props: Props) => {
  const { delivery_id, status } = props;
  const token = localStorage.getItem("token");
  const takeOrder = (e: any, status: any) => {
    changeDeliStatus(delivery_id, token, status)
      .then((res) => {
        window.location.reload();
        toast.success("You have successfully took the order 🌟");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {status === DeliveryStatus.Pending ? (
        <>
   
   
       <Button
         variant="contained" color="primary" sx={{fontWeight:"bold"}}
          onClick={(e) => takeOrder(e, DeliveryStatus.AcceptForDeliver)}
        >
          Accept 
        </Button>
      
        </>
      ) : status === DeliveryStatus.AcceptForDeliver ? (
        <>
          <Button
           variant="contained" color="warning" sx={{fontWeight:"bold"}}
            onClick={(e) => takeOrder(e, DeliveryStatus.OutForDeliver)}
          >
            Out For Delivery
          </Button>
        </>
      ) : status === DeliveryStatus.OutForDeliver ? (
        <>
          <Button
             variant="contained" color="secondary" sx={{fontWeight:"bold"}}
            onClick={(e) => takeOrder(e, DeliveryStatus.Arrived)}
          >
            Arrived
          </Button>
        </>
      ) : status === DeliveryStatus.Arrived ? (
        <>
          <Button
           variant="contained" color="success" sx={{fontWeight:"bold"}}
            onClick={(e) => takeOrder(e, DeliveryStatus.Delivered)}
          >
            Delivered
          </Button>
        </>
      ) : (
        <>
           <Button
          variant="contained"
            disabled
            color="inherit"
          >
            Delivered
          </Button></>
      )}
    </div>
  );
};