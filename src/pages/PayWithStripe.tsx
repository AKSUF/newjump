import { payWithStripe } from "../service/Delivery";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { getPersonalProfile } from "../service/ProfileService";
import { getProductSingleDetails } from "../service/ProductService";
import { toast } from "react-toastify";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const PayWithStripe: React.FC = () => {
  const { productId, delivery_details_id, quantity } = useParams<{ productId: string, delivery_details_id: string, quantity: string }>();
  const [product, setProduct] = useState<any>();
  const token = localStorage.getItem("token");
  const [delivery, setDelivery] = useState({
    amount: "",
  });

  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        console.log(res.data);
        getProductSingleDetails(productId, token)
          .then((res) => {
            console.log(res.data);
            setProduct(res.data);
            
            const totalPrice = quantity ? res.data.price * parseInt(quantity) : 0;
            setDelivery({
              ...delivery,
              amount: totalPrice.toString(),
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in loading post");
          });
      })
      .catch((error) => {
        toast.error("Error While Fetching, Please retry later!");
      });
  }, [productId, token]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = (event: any) => {
    event.preventDefault();
    payWithStripe(delivery, productId, token, delivery_details_id, quantity)
      .then((res) => {
        console.log("+++++++++++++" + res.data);
        toast.success("Payment Successful");
      })
      .catch((error) => {
        toast.error("Payment Error");
        console.log(error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDelivery({
      ...delivery,
      [name]: value,
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Pay with Stripe
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment Information</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
          <TextField
  id="amount"
  name="amount"
  label="Amount"
  type="number"
  value={delivery.amount}
  onChange={handleChange}
  fullWidth
  margin="normal"
  variant="outlined"
/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Pay with Stripe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PayWithStripe;