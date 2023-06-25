import React, { useState } from 'react';
import { Dialog, DialogContent, TextField, Button } from '@mui/material';
import { updaterequest } from '../service/BuyProduct';
import { uploadProductImage } from '../service/ProductService';
import { toast } from 'react-toastify';

interface ProductDialogProps {
  open: boolean;
  handleClose: () => void;
  request: Request;
  updateRequest: (request: Request) => void;
}

interface Request {
  buyProductId:number,
  productName: string;
  howMuch: string;
  producerId: String;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  handleClose,
  request,
  updateRequest,
}) => {
  const [buyProductId, setBuyProductId] = useState(request.buyProductId);
  const [productName, setProductName] = useState(request.productName);
  const [howMuch, setHowMuch] = useState(request.howMuch);
  const [producerId, setProducerId] = useState(request.producerId);
  const token = localStorage.getItem("token");
  const [imageFile, setImageFile] = useState();
  const [preview, setPreview] = useState<string | null>(null);




  const editProductlDetails = (event: any) => {
    event.preventDefault();
    // console.log(car)
    updaterequest({ ...request,buyProductId, productName, howMuch, producerId }, token)

      .then((res) => {
        if (imageFile) {
          uploadProductImage(request.buyProductId, imageFile, token)
            .then((data) => {
              toast.success("Image uploaded");
            })
            .catch((error) => {
              toast.error("error in uploading image");
              console.log(error);
            });
        }
        console.log(res);
        toast.success("Meal details updated");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in upading Product details");
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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <form onSubmit={editProductlDetails}>
          <TextField
            label="Product Name"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Product Description"
            value={howMuch}
            onChange={(event) => setHowMuch(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Product Price"
            value={producerId}
            onChange={(event) => setProducerId((event.target.value))}
            type="number"
            fullWidth
            margin="normal"
          />
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
          <Button type="submit" color="primary">
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;