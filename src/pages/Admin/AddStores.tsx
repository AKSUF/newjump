import React, { useState } from "react";
import { toast } from "react-toastify";
import { addStoreDetails, uploadStoreImage } from "../../service/StoreService";
import { Box, Container, Grid, Typography } from "@mui/material";

const AddStore = () => {
  const token = localStorage.getItem("token");
  const [imageFile, setImageFile] = useState();
  const [preview, setPreview] = useState<string | null>(null);
  const [store, setStore] = useState({
    store_name: "",
    store_address: "",
    store_desc: "",
    store_image: "",
    category: "",
    availableDays: "",
    opens: "",
    closes: "",
  });
  const fieldChanged = (event: any) => {
    setStore({ ...store, [event.target.name]: event.target.value });
    console.log(store);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (
      store.store_name.length <= 1 ||
      store.store_address.length <= 3 ||
      store.store_desc.length <= 5
    ) {
      toast.error("Please fill in all required Data");
      return;
    }
    if (store.store_name.trim() === "") {
      toast.error("Store Name is Required");
      return;
    }
    if (store.store_address.trim() === "") {
      toast.error("Store Address is Required");
      return;
    }
    if (store.store_desc.trim() === "") {
      toast.error("Store Description is Required");
      return;
    }

    if (store.category.trim() === "") {
      toast.error("Store category is Required");
      return;
    }
    if (store.availableDays.trim() === "") {
      toast.error("Store Available Days is Required");
      return;
    }
    if (store.opens.trim() === "") {
      toast.error("Store opens Time is Required");
      return;
    }
    if (store.closes.trim() === "") {
      toast.error("Store closes Time is Required");
      return;
    }
    addStoreDetails(store, token)
      .then((res) => {
        console.log(res.data.store_id);
        uploadStoreImage(res.data.store_id, imageFile, token)
          .then((data) => {
            toast.success("Image uploaded");
          })
          .catch((error) => {
            toast.error("error in uploading image");
            console.log(error);
          });

        toast.success("Store Details Uploaded");
        console.log(store);
        setStore({
          store_name: "",
          store_address: "",
          category: "",
          store_desc: "",
          store_image: "",
          availableDays: "",
          opens: "",
          closes: "",
        });
      })
      .catch((error) => {
        toast.error("Store Details not  Uploaded due to some error !! ");
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
    }};

  return (
    <div className=" bg-gray-50">
      <div className="p-14 m-0">
        <Grid container spacing={1}>
          <Grid xl={4} md={3} xs={0}></Grid>
          <Grid xl={4} md={6} xs={12}>
            <div className=" rounded-lg bg mb-16 border-2 border-gray-300 shadow-xl p-2">
              <div className="text-center text-2xl text-red-900 py-5 pt-10 font-bold uppercase font-serif">
                ADD STORE DETAILS
              </div>
              <hr></hr>

              <form onSubmit={handleSubmit}>
                <div className="form-group   m-3 ">
                  <label className="font-bold" htmlFor="store_name">
                    Store Name:
                  </label>
                  <input
                    type="text"
                    id="store_name"
                    name="store_name"
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

                <div className="form-group   m-3 ">
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
                    <option className=" font-bold ">Clothes </option>
                    <option className=" font-bold ">Fruit</option>
                    <option className=" font-bold ">Flower shop</option>
                    <option className=" font-bold ">Machinery</option>
                    <option className=" font-bold ">Book Shop</option>
                    <option className=" font-bold ">Furniture Shop</option>
                    <option className=" font-bold ">Toys Shop</option>
                  </select>
                </div>

                <div className="form-group mb-1 m-3">
                  <label className="font-bold" htmlFor="availableDays">
                    Available:
                  </label>
                  <select
                    id="availableDays"
                    name="availableDays"
                    onChange={fieldChanged}
                    multiple
                    className="form-control block
              w-full
              p-2
              py-1.5
              text-base
              
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none required"
                  >
                    <option className=" font-bold text-[14px] border-b ">
                      Sunday
                    </option>
                    <option className=" font-bold text-[14px] border-b ">
                      Monday
                    </option>
                    <option className=" font-bold text-[14px] border-b ">
                      Tuesday
                    </option>
                    <option className=" font-bold text-[14px] border-b  ">
                      Wednesday
                    </option>
                    <option className=" font-bold text-[14px] border-b ">
                      Friday
                    </option>
                    <option className=" font-bold text-[14px] border-b ">
                      Saturday
                    </option>
                  </select>
                </div>

                <div className="flex">
                  <div className="form-group mb-1 m-3 w-6/12">
                    <label className="font-bold" htmlFor="opens">
                      Store Opens
                    </label>
                    <input
                      type="time"
                      id="opens"
                      name="opens"
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
                    <label className="font-bold" htmlFor="closes">
                      Store Closes:
                    </label>
                    <input
                      type="time"
                      id="closes"
                      name="closes"
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
                </div>

                <div className="form-group mb-1 m-3">
                  <label className="font-bold" htmlFor="store_address">
                    Store Address:
                  </label>
                  <input
                    type="text"
                    id="store_address"
                    name="store_address"
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

                <div className="form-group mb-1 m-3">
                  <label htmlFor="store_image" className="fw-bold">
                    Select Image
                  </label>
                  <div>
                    <input
                      id="store_image"
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

                <div className="form-group mb-1 m-3">
                  <label className="font-bold" htmlFor="store_desc">
                    Store Description:
                  </label>
                  <textarea
                    id="store_desc"
                    name="store_desc"
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
          <Grid xl={4} md={3} xs={0}></Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddStore;