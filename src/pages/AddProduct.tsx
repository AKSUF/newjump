import { Box, Grid } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { showAllStore } from "../service/StoreService";
import {
  addProductDetails,
  uploadProductImage,
  uploadProductImages,
} from "../service/ProductService";
interface Props {
  productId: number;
}
const AddProduct = () => {
  const token = localStorage.getItem("token");
  const [imageFile, setImageFile] = useState();
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);


  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  

  const [product, setProduct] = useState({
    productName: "",
    product_desc: "",
    price: "",
    category: "",
    availableQuantity: "",
    shippingAddress: "",
    weight: "",
    dimensions: "",

  });
  const fieldChanged = (event: any) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
    console.log(product);
  };

  

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (
      product.productName.length <= 1 ||
      product.price.length <= 0 ||
      product.product_desc.length <= 5 
      
    ) {
      toast.error("Please fill in all required Data");
      return;
    }
    if (product.productName.trim() === "") {
      toast.error("Store Name is Required");
      return;
    }
    if (product.product_desc.trim() === "") {
      toast.error("Store Address is Required");
      return;
    }
    if (product.category.trim() === "") {
      toast.error("Store Description is Required");
      return;
    }

    if (product.price.trim() === "") {
      toast.error("Store category is Required");
      return;
    }
  
    if (product.availableQuantity === "") {
      toast.error("Available Quantity is Required");
      return;
    }

    addProductDetails(product, token)
      .then((res) => {
        console.log(res.data.product_id);
        uploadProductImage(res.data.productId, imageFile, token)
          .then((res) => {
            console.log(res.data);
            console.log(res.data.product_id);
            
            toast.success("Image uploaded");
          })
          .catch((error) => {
            toast.error("error in uploading image");
            console.log(error);
          });
      

        toast.success("Product Details Uploaded");
        console.log(product);
        setProduct({
          productName: "",
          product_desc: "",
          price: "",
          category: "",
          availableQuantity: "",
          shippingAddress: "",
          weight: "",
          dimensions: ""
       
        });
      })
      .catch((error) => {
        toast.error("Product Details not  Uploaded due to some error !! ");
        console.log(error);
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


  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleDeleteClick = (index: number) => {
    const newImages = [...images];
    const newPreviewUrls = [...previewUrls];
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };
  

  return (
    <div className=" bg-gray-50">
      <div className="p-14 m-0">
        <Grid container spacing={1}>
          <Grid xl={3} md={3} xs={0}></Grid>
          <Grid xl={6} md={6} xs={12}>
            <div className=" rounded-lg bg mb-16 border-2 border-gray-300 shadow-xl p-2">
              <div className="text-center text-2xl text-red-900 py-5 pt-10 font-bold uppercase font-serif">
                Add Product Details
              </div>
              <hr></hr>

              <form onSubmit={handleSubmit}>
                <div className="form-group   m-3 ">
                  <label className="font-bold" htmlFor="productName">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    onChange={fieldChanged}
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
                  />
                </div>

            

                <Box className="flex">
                  <div className="form-group   m-3  w-6/12">
                    <label className="font-bold" htmlFor="category">
                      Store Category:
                    </label>
                    <select
                      id="category"
                      name="category"
                      onChange={fieldChanged}
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

                  <div className="form-group   m-3  w-6/12">
                    <label className="font-bold" htmlFor="shippingAddress">
                      Shipping Address:
                    </label>
                    <select
                      id="shippingAddress"
                      name="shippingAddress"
                      onChange={fieldChanged}
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
                        -- Shipping Address --
                      </option>
                      <option className=" font-bold">Barisal</option>
                      <option className=" font-bold">Chittagong</option>
                      <option className=" font-bold">Cox's Bazar</option>
                      <option className=" font-bold ">Cumilla</option>
                      <option className=" font-bold ">Dhaka</option>
                      <option className=" font-bold ">Jessore</option>
                      <option className=" font-bold ">Khulna</option>
                      <option className=" font-bold ">Rajshahi</option>
                      <option className=" font-bold ">Sylhet</option>
                    </select>
                  </div>
                </Box>

                <Box className="flex">
                  <div className="form-group mb-1 m-3 w-6/12">
                    <label className="font-bold" htmlFor="price">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      onChange={fieldChanged}
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
                      onChange={fieldChanged}
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

                <Box className="flex">
                  <div className="form-group mb-1 m-3 w-6/12">
                    <label className="font-bold" htmlFor="weight">
                      Weight
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      onChange={fieldChanged}
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
                    <label className="font-bold" htmlFor="dimensions">
                      Dimensions
                    </label>
                    <input
                      type="number"
                      id="dimensions"
                      name="dimensions"
                      onChange={fieldChanged}
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
                </div>



                <div className="form-group mb-1 m-3">
                  <label className="font-bold" htmlFor="product_desc">
                    Store Description:
                  </label>
                  <textarea
                    id="product_desc"
                    name="product_desc"
                    onChange={fieldChanged}
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
                    onClick={(e) => handleSubmit(e)}
                    className="  bg-sky-800 mt-2 mb-5 py-2 font-bold  hover:bg-sky-700  700   w-10/12   text-white rounded-md  "
                  >
                    Add Store Details
                  </button>
                </Box>
                <Box className=" "></Box>
              </form>
            </div>
          </Grid>
          <Grid xl={3} md={3} xs={0}></Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddProduct;
