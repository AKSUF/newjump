import React from 'react'

import { useEffect, useState } from "react";


import { toast } from "react-toastify";
import {  Grid } from '@mui/material';
import { getDetailsByUser, getParticularDeliverDetails, updateDelieryDetails } from '../../service/DeliveryDetails';

import { useNavigate, useParams } from 'react-router-dom';

const EditDeliveryAddress = () => {
    const { delivery_details_id } = useParams();
    const navigate = useNavigate();
 
    const token = localStorage.getItem("token");
    const [deliverDetails, setDeliverDetails] = useState({
        name: "",
        phone_number: "",
        delivery_address: "",
        
      });
      useEffect(() => {
        
            getDetailsByUser(token)
              .then((res) => {
                setDeliverDetails(res.data);
                console.log(res.data);
    
                return;
              })
              .catch((error) => {
                console.log(error);
              });
         
      }, []);

      const handleChange = (event: any, fieldName: any) => {
        console.log(fieldName + " " + event.target.value);
        setDeliverDetails({
          ...deliverDetails,
          [fieldName]: event.target.value,
        });
      };

      useEffect(() => {
        getParticularDeliverDetails(delivery_details_id,token)
          .then((res) => {
            console.log(res.data);
            setDeliverDetails(res.data);
          })
          .catch((error) => {
            console.log(error);
            
          });
      }, []);
    
      
  




  
 
 
    const handleSave = (event: any) => {
        event.preventDefault();
        updateDelieryDetails({ ...deliverDetails }, token).then((res)=>{
            toast.success("Delivery details updated");
            console.log(res);
        toast.success("Meal details updated");
        }).catch((error) => {
            console.log(error);
          });

    }
  return (
   
                  
               
    <div className="  m-28">
         <Grid container spacing={1}>
        <Grid xs={4}></Grid>
        <Grid xs={4} className='my-6'>
        
    <div className="p-5 m-0">
      <Grid container spacing={1}>
        <Grid xs={12}>
          <div className=" rounded-lg bg border-2 border-gray-300 shadow-xl p-2">
            <div className="text-center text-2xl text-red-900 py-5 font-bold uppercase font-serif">
              Edit Deliver Details
            </div>
            <hr></hr>
            <form onSubmit={handleSave}>
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
          onClick={(e) => handleSave(e)}
        >
          Submit
        </button>
       
      </div>
      </form>
          </div>
        </Grid>
       
      </Grid>
    </div>
    </Grid>
    
    <Grid xs={4}></Grid>
    </Grid>
  </div>
  )
}

export default EditDeliveryAddress