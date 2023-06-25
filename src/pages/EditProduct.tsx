import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { getProductSingleDetails, updateProducts, uploadProductImage } from "../service/ProductService";
import { showAllStore } from "../service/StoreService";

const EditProduct = () => {
  const { productId } = useParams();
  const token = localStorage.getItem("token");
  const [stores, setStores] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [preview, setPreview] = useState<string | null>(null);
  const [product, setProduct] = useState({
    productName: "",
    status: "",
    price:"",
    category: "",
    product_desc: "",
    availableQuantity:"",
   
  });
  useEffect(() => {
    showAllStore(token)
      .then((res) => {
        setStores(res.data);
        console.log(res.data);

        return;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getProductSingleDetails(productId,token)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event: any, fieldName: any) => {
    console.log(fieldName + " " + event.target.value);
    setProduct({
      ...product,
      [fieldName]: event.target.value,
    });
  };
  

  const editProductlDetails = (event: any) => {
    event.preventDefault();
    // console.log(car)
    updateProducts({ ...product }, token)
      .then((res) => {
        if (imageFile) {
          uploadProductImage(productId, imageFile, token)
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
  // handling file change image
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
    <div className=" bg-gray-50">
    <div className="p-14 m-0">
      <Grid container spacing={1}>
        <Grid xl={4} md={3} xs={0}></Grid>
        <Grid xl={4} md={6} xs={12}>
          <div className=" rounded-lg bg mb-16 border-2 border-gray-300 shadow-xl p-2">
            <div className="text-center text-2xl text-red-900 py-5 pt-10 font-bold uppercase font-serif">
              Add Product Details
            </div>
            <hr></hr>

            <form onSubmit={editProductlDetails}>
              <div className="form-group   m-3 ">
                <label className="font-bold" htmlFor="productName">
                  Store Name:
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={product.productName}
                  onChange={(event) => handleChange(event, "productName")}                  className="form-control block
            w-full
            p-2
            py-1.5
            text-base
            font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none required"
                />
              </div>


              <div className="form-group   m-3 ">
                <label className="font-bold" htmlFor="category">
                  Store Category:
                </label>
                <select
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={(event) => handleChange(event, "category")}  
                  className="form-control block
            w-full
            p-2
            py-1.5
            text-base
            font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none required"
                >
                  <option disabled value={0}>
                    -- Select Category --
                  </option>
                  <option className=" font-bold">Makeup</option>
                  <option className=" font-bold ">Grocery</option>
                  <option className=" font-bold ">Electronic</option>
                  <option className=" font-bold ">Fruit</option>
                  <option className=" font-bold ">Flower shop</option>
                  <option className=" font-bold ">Machinery</option>
                  <option className=" font-bold ">Book Shop</option>
                  <option className=" font-bold ">Furniture Shop</option>
                  <option className=" font-bold ">Toys Shop</option>
                </select>
              </div>

              <Box className="flex">
               <div className="form-group mb-1 m-3 w-6/12">
                  <label className="font-bold" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                  onChange={(event) => handleChange(event, "price")}   
                    className="form-control block
              w-full
              p-2
              py-1.5
              text-base
              font-normal
             text-gray-700
             bg-white bg-clip-padding
             border border-solid border-gray-300
             rounded
             transition
             ease-in-out
             m-0
             focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div className="form-group mb-1 m-3 w-6/12">
                  <label className="font-bold" htmlFor="availableQuantity">
                  Available Quantity
                  </label>
                  <input
                    type="number"
                    id="availableQuantity"
                    name="availableQuantity"
                    value={product.availableQuantity}
                  onChange={(event) => handleChange(event, "availableQuantity")}   
                    className="form-control block
              w-full
              p-2
              py-1.5
              text-base
              font-normal
             text-gray-700
             bg-white bg-clip-padding
             border border-solid border-gray-300
             rounded
             transition
             ease-in-out
             m-0
             focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                  />
                </div>
               </Box>






             




              <div className="form-group   m-3 ">
                <label className="font-bold" htmlFor="status">
                  Store Category:
                </label>
                <select
                  id="status"
                  name="status"
                  value={product.status}
                  onChange={(event) => handleChange(event, "status")}  
                  className="form-control block
            w-full
            p-2
            py-1.5
            text-base
            font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none required"
                >
                  <option disabled value={0}>
                    -- Select status --
                  </option>
                  <option className=" font-bold">Available</option>
                  <option className=" font-bold ">Out of Stock</option>
                
                </select>
              </div>































              <div className="form-group mb-1 m-3">
                <div className="my-3 text-left">
                  <label htmlFor="image" className="fw-bold">
                    Select Image
                  </label>
                  <div>
                    <input
                      id="image"
                      type="file"
                      onChange={handleFileChage}
                    />
                    {preview && (
                        <img
                          src={preview}
                          alt="Preview"
                          width="200"
                          height="200"
                        />
                      )}
                  </div>
                </div>

                {/* <div>
                  <input id="store_image" type="file" onChange={handleFileChage} />
                </div> */}
              </div>

              <div className="form-group mb-1 m-3">
                <label className="font-bold" htmlFor="product_desc">
                  Store Description:
                </label>
                <textarea
                  id="product_desc"
                  name="product_desc"
                  value={product.product_desc}
                  onChange={(event) => handleChange(event, "product_desc")}   
                  className="form-control block
            w-full
            p-2
            py-1.5
            text-base
            font-normal
           text-gray-700
           bg-white bg-clip-padding
           border border-solid border-gray-300
           rounded
           transition
           ease-in-out
           m-0
           focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                />
              </div>
              <Box className="sm:pl-20 pl-10">
                <button
                  onClick={(e) => editProductlDetails(e)}
                  className="  bg-sky-800 mt-2 mb-5 py-2 font-bold  hover:bg-sky-700  700   w-10/12   text-white rounded-md  "
                >
                  Add Store Details
                </button>
              </Box>
              <Box className=" "></Box>
            </form>
          </div>
        </Grid>
        <Grid xl={4} md={3} xs={0}></Grid>
      </Grid>
    </div>
  </div>
  );
};

export default EditProduct;