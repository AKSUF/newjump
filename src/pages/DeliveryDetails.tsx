import React from 'react'
import { AddDelieryDetails, getDetailsByUser, updateDelieryDetails } from '../service/DeliveryDetails';

import { useEffect, useState } from "react";

import {
  getPersonalProfile,

} from "../service/ProfileService";
import { toast } from "react-toastify";
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

const DeliveryDetails = () => {
 
    const token = localStorage.getItem("token");
    const [deliverDetails, setDeliverDetails] = useState({
        name: "",
        phone_number: "",
        delivery_address: "",
        district: "",
        
      });
      const districts = [
        { label: "Chittagong", value: "Chittagong" },
        { label: "Dhaka", value: "Dhaka" },
        { label: "Cumilla", value: "Cumilla" },
        { label: "Barisal", value: "Barisal" },
        { label: "Jessore", value: "Jessore" },
        { label: "Rajshahi", value: "Rajshahi" },
        { label: "Cox's Bazar", value: "Cox's Bazar" },
        { label: "Khulna", value: "Khulna" },
        { label: "Sylhet", value: "Sylhet" },
      ];

      const handleChange = (event: any, fieldName: any) => {
        console.log(fieldName + " " + event.target.value);
        setDeliverDetails({
          ...deliverDetails,
          [fieldName]: event.target.value,
        });
      };
        


    useEffect(() => {
        getPersonalProfile(token)
          .then((res) => {
            console.log(res.data);
            getDetailsByUser(token)
              .then((res) => {
                setDeliverDetails(res.data);
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
  
 
    const handleSubmit = (e: any) => {
        e.preventDefault();
    if (
      deliverDetails.name.length <= 0 ||
      deliverDetails.phone_number.length <= 0 ||
      deliverDetails.delivery_address.length <= 0 
    ) {
     
      toast.error("Please fill in all required Data");
      return;
    }
        AddDelieryDetails(deliverDetails, token)
        .then((res)=>{
            console.log(res.data.delivery_details_id);
            toast.success("deliverDetails Details Uploaded");
        console.log(deliverDetails);
            
        }).catch((error) => {
            toast.error("Product Details not  Uploaded due to some error !! ");
            console.log(error);
          });
    }

  return (
    <div className=" bg-gray-50">
        
    <div className="p-5 m-0">
      <Grid container spacing={1}>
        <Grid xs={12}>
          <div className=" rounded-lg bg border-2 border-gray-300 shadow-xl p-2">
            <div className="text-center text-2xl text-red-900 py-5 font-bold uppercase font-serif">
              Deliver Details
            </div>
            <hr></hr>

              <div className="form-group   m-1 ">
                <label className="font-bold" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={deliverDetails.name}
                  onChange={(event) => handleChange(event, "name")}                  className="form-control block
            w-full
            p-1
         
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



              <div className="form-group   m-1 ">
                <label className="font-bold" htmlFor="phone_number">
                Phone Number:
                </label>
                
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={deliverDetails.phone_number}
                  onChange={(event) => handleChange(event, "phone_number")}                  className="form-control block
            w-full
            p-1
           
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
              <FormControl fullWidth>
          <InputLabel htmlFor="district-select">District</InputLabel>
          <Select
            id="district-select"
            name="district"
            style={{ marginBottom: "10px", width: "100%" }}
            value={deliverDetails.district}
            onChange={(event) => handleChange(event, "district")}
            required
          >
            {districts.map((district) => (
              <MenuItem key={district.value} value={district.value}>
                {district.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

              <div className="form-group   m-1 ">
                <label className="font-bold" htmlFor="delivery_address">
                Address:
                </label>
                <input
                  type="text"
                  id="delivery_address"
                  name="delivery_address"
                  value={deliverDetails.delivery_address}
                  onChange={(event) => handleChange(event, "delivery_address")}         
                   className="form-control block
            w-full
            p-1
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












              <div className="lg:px-36">
        
          <button
          className="p-2 rounded-md bg-green-400 shadow-md shadow-green-300
        text-white"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
       
      </div>
          </div>
        </Grid>
       
      </Grid>
    </div>
  </div>
  )
}

export default DeliveryDetails


