import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Container,
    Box,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { editShifts, singleShift, userShifts } from "../../service/SetShifts";
  import { toast } from "react-toastify";
  import { useParams } from "react-router-dom";
  
  function EditShiftForm() {
    const { shifttoken } = useParams();
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
  
    const shiftsStatus = [
      { label: "Available", value: "Available" },
      { label: "Unavailable", value: "Unavailable" },
      { label: "Taken", value: "Taken" },
      { label: "Offer swap", value: "Offer_swap" },
     
      
    ];
    const token = localStorage.getItem("token");
    const [setShift, setSetShift] = useState({
      startTime: "",
      endTime: "",
      district: "",
      address: "",
      date: "",
      shiftStatus: "",
    });
    const handleChange = (event: any, fieldName: any) => {
      console.log(fieldName + " " + event.target.value);
      setSetShift({
        ...setShift,
        [fieldName]: event.target.value,
      });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      editShifts({ ...setShift }, token)
        .then((res) => {
          console.log(res.data);
  
          toast.success("Product Details Uploaded");
          console.log(setShift);
          setSetShift({
            startTime: "",
            endTime: "",
            district: "",
            address: "",
            date: "",
            shiftStatus: "",
            
          });
        })
        .catch((error) => {
          toast.error("Product Details not  Uploaded due to some error !! ");
          console.log(error);
        });
    };
  
    useEffect(() => {
      singleShift(token, shifttoken)
        .then((res) => {
          console.log(res.data);
          setSetShift(res.data);
  
          return;
        })
        .catch((error) => {
          toast.error(error);
        });
    }, []);
    return (
     <div className="bg-slate-50 pt-10 min-h-screen">
      <Container >
      <Box className="shadow-md p-4 bg-white rounded-2xl">
        <h1 className="uppercase font-bold text-3xl p-2 text-center underline underline-offset-2"> Edit Shift</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          name="date"
          type="date"
          value={setShift.date}
          onChange={(event) => handleChange(event, "date")}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Start Time"
          name="startTime"
          type="time"
          value={setShift.startTime}
          onChange={(event) => handleChange(event, "startTime")}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="End Time"
          name="endTime"
          type="time"
          value={setShift.endTime}
          onChange={(event) => handleChange(event, "endTime")}
          fullWidth
          margin="normal"
          variant="outlined"
        />
  
        <FormControl fullWidth>
          <InputLabel htmlFor="district-select">District</InputLabel>
          <Select
            id="district-select"
            name="district"
            style={{ marginBottom: "10px", width: "100%" }}
            value={setShift.district}
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
        <TextField
          label="Shift Name"
          name="name"
          type="text"
          value={setShift.address}
          onChange={(event) => handleChange(event, "address")}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel htmlFor="shiftStatus-select">Shift Status</InputLabel>
          <Select
            id="shiftStatus-select"
            name="shiftStatus"
            style={{ marginBottom: "10px", width: "100%" }}
            value={setShift.shiftStatus}
            onChange={(event) => handleChange(event, "shiftStatus")}
            required
          >
            {shiftsStatus.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
      </Box>
      </Container>
     </div>
    );
  }
  
  export default EditShiftForm;