import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { toast } from "react-toastify";
  import { deleteShift, setShifts, userShifts } from "../../service/SetShifts";
  import { Link } from "react-router-dom";
  import ShiftStatus from "../../Utils/ShiftStatus";
  import DeleteIcon from "@mui/icons-material/Delete";
  import filteringProduct from "../../Utils/filteringProduct";
  import { all } from "axios";
  interface Shift {
    name: string;
    startTime: string;
    endTime: string;
  }
  
  interface Props {
    shift: Shift;
    onSubmit: (updatedShift: Shift) => void;
  }
  
  const SetShifts = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const [setShift, setSetShift] = useState({
      startTime: "",
      endTime: "",
      district: "",
      address: "",
      date: "",
    });
    const token = localStorage.getItem("token");
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
    const [allShifts, setAllShifts] = useState<any>();
    const [shiftss, setShiftss] = useState<any>();
  
  
    const handleSubmit = (event: any) => {
      event.preventDefault();
      if (setShift.startTime === "") {
        toast.error("Start Time can't be null");
        return;
      }
      if (setShift.endTime === "") {
        toast.error("End Time can't be null");
        return;
      }
      if (setShift.date === "") {
        toast.error("Date can't be null");
        return;
      }
  
      if (setShift.address.length < 5) {
        toast.error("Phone number must be 11 characters");
        return;
      }
      setShifts(setShift, token)
        .then((res) => {
          toast.success("Product Details Uploaded");
          console.log(setShift);
          setSetShift({
            startTime: "",
            endTime: "",
            district: "",
            address: "",
            date: "",
          });
          handleClose();
        })
        .catch((error) => {
          toast.error("Product Details not  Uploaded due to some error !! ");
          console.log(error);
        });
    };
    const fieldChanged = (event: any) => {
      setSetShift({ ...setShift, [event.target.name]: event.target.value });
      console.log(setShift);
    };
  
    useEffect(() => {
      userShifts(token)
        .then((res) => {
          console.log(res.data);
          setAllShifts(res.data);
          setSetShift(res.data);
          setShiftss(res.data);
  
          return;
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const filterShiftStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
      filteringProduct(e, setAllShifts, shiftss);
    };
  
  
    function deleteShiftsss(shift: any) {
      if (window.confirm("Are you sure")) {
        deleteShift(shift.shiftsToken, token)
          .then((data) => {
            toast.success("Shift Deletes Successfully");
            let newProductContent = allShifts.filter(
              (p: any) => p.shiftsToken != shift.shiftsToken
            );
            setAllShifts([...newProductContent]);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in deleting Shift");
          });
      }
    }
  
    
  
    const printDate = (numbers: any, options: any = {}) => {
      const { day = "numeric", month = "short" } = { ...options };
      const date = new Date(numbers);
      return date.toLocaleDateString("en-US", { day, month });
    };
  
    return (
      <div className="m-3">
        <Container maxWidth={"xl"}>
          <button
            className="bg-blue-800 mb-5 p-2 mx-3 text-white rounded-md"
            onClick={handleOpen}
          >
            Set Shift
          </button>
  
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="font-extrabold text-center text-green-800">
              {" "}
              SET SHIFTS
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill in the details for shifts.
              </DialogContentText>
              <form onSubmit={handleSubmit}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="startTime"
                  label="Start Time"
                  type="time"
                  fullWidth
                  required
                  onChange={fieldChanged}
                  value={setShift.startTime}
                />
                <TextField
                  margin="dense"
                  name="endTime"
                  label="End Time"
                  type="time"
                  fullWidth
                  required
                  onChange={fieldChanged}
                  value={setShift.endTime}
                />
                <TextField
                  margin="dense"
                  name="date"
                  label="Date"
                  type="date"
                  fullWidth
                  required
                  onChange={fieldChanged}
                  value={setShift.date}
                />
  
                <FormControl fullWidth>
                  <InputLabel htmlFor="district-select">District</InputLabel>
                  <Select
                    id="district-select"
                    name="district"
                    style={{ marginBottom: "10px", width: "100%" }}
                    value={setShift.district}
                    onChange={fieldChanged}
                    required
                  >
                    {districts.map((district) => (
                      <MenuItem key={district.value} value={district.value}>
                        {district.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="address-input">Address</InputLabel>
                  <Input
                    id="address-input"
                    name="address"
                    type="text"
                    style={{ margin: "10px 0", width: "100%" }}
                    value={setShift.address}
                    onChange={fieldChanged}
                  />
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Set Shifts
              </Button>
            </DialogActions>
          </Dialog>
          <Box p={3}>
                  <FormControl className="w-[200px] ">
                    <InputLabel
                      className="text-xl"
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Shift Status
                    </InputLabel>
                    <NativeSelect
                      defaultValue={"all"}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      onChange={(e) => filterShiftStatus(e)}
                    >
                      <option value={"Available"}>Available</option>
                      <option value={"Unavailable"}>Unavailable</option>
                      <option value={"Taken"}>Taken</option>
                      <option value={"Offer_swap"}>Offer Swap</option>
                      
                    </NativeSelect>
                  </FormControl>
                </Box>
  
          <Grid container spacing={2}>
            {allShifts != undefined
              ? allShifts.map((shift: any, index: any) => {
                  return (
                    <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                      <Card elevation={10}>
                        <Grid container>
                          <Grid item xs={12}>
                          <Box className="justify-end flex">
                               <DeleteIcon  onClick={() => deleteShiftsss(shift)} className="  border m-2 text-red-900"/>
                              </Box>
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Box className="p-4 rounded-full border font-bold text-xl">
                                {printDate(shift.date)}
                              </Box>
  
                             
                            </Box>
                           
                          </Grid>
                          <Grid item md={9} xs={12}>
                            <CardContent>
                              <Typography gutterBottom>
                                <div>
                                  {shift.shiftStatus === ShiftStatus.Available ? (
                                    <>
                                      <h1 className="text-green-600 font-bold font-serif">
                                        ( {shift.shiftStatus} )
                                      </h1>
                                    </>
                                  ) : shift.shiftStatus ===
                                    ShiftStatus.Unavailable ? (
                                    <>
                                      <h1 className="text-gray-500 font-bold font-serif">
                                      ( {shift.shiftStatus} )
                                      </h1>
                                    </>
                                  ) : shift.shiftStatus === ShiftStatus.Taken ? (
                                    <>
                                      <h1 className="text-red-700 font-bold font-serif">
                                      ( {shift.shiftStatus} )
                                      </h1>
                                    </>
                                  ) : (
                                    <>
                                      <h1 className="text-blue-600 font-bold font-serif">
                                        ( Offer Swaped )
                                      </h1>
                                    </>
                                  )}
                                </div>
                                <div className="m">
                                  <span className="font-bold text-gray-600">
                                    Time:
                                  </span>
                                  : {shift.startTime} - {shift.endTime}
                                </div>
                                <div className="">
                                  <span className="font-bold text-gray-600">
                                    District
                                  </span>
                                  : {shift.district}
                                </div>
                                <div className="">
                                  <span className="font-bold text-gray-600">
                                    Address
                                  </span>
                                  : {shift.address}
                                </div>
                              </Typography>
                            </CardContent>
                            <CardActions
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                              }}
                              className="font-bold"
                            ></CardActions>
                          </Grid>
                          <Grid
                            item
                            md={3}
                            xs={12}
                            className="flex justify-center items-center "
                          >
                            <Box m={2}>
                              <Link
                                to={`/employee/edit-shift/${shift.shiftsToken}`}
                              >
                                <Button
                                  variant="contained"
                                >
                                  Edit
                                </Button>
                              </Link>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  );
                })
              : ""}
          </Grid>
        </Container>
      </div>
    );
  };
  
  export default SetShifts;