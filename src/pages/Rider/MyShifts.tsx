import React, { useEffect, useState } from "react";
import {  getAllShiftsbasedRiderId, offerSwap, riderDistrictbasedShift, takeShift } from "../../service/SetShifts";
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShiftStatus from "../../Utils/ShiftStatus";
import { getPersonalProfile } from "../../service/ProfileService";
import { toast } from "react-toastify";
const MyShifts = () => {

    const [shifts, setShifts] = useState<any>();
    const token = localStorage.getItem("token");
    const printDate = (numbers: any, options: any = {}) => {
        const { day = "numeric", month = "short" } = { ...options };
        const date = new Date(numbers);
        return date.toLocaleDateString("en-US", { day, month });
      };

 
    useEffect(() => {
        getPersonalProfile(token)
          .then((res) => {
            const user = res.data;
            console.log(user);
            getAllShiftsbasedRiderId(token)
              .then((res) => {
                let availableShifts = res.data.filter((shift: any) => shift.shiftStatus === "Taken" || shift.shiftStatus === "Offer_swap");
                console.log(availableShifts);
                setShifts(availableShifts);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
            
          });
      }, [token]);
      
  function riderTakeShift(shift: any) {
    if (window.confirm("Don't you want to swap shifts?")) {
      takeShift(shift.shiftsToken, token)
        .then((res) => {
          console.log(res.data);

          toast.success("You have successfully took the Shift 🌟");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in Approving the product");
        });
    }
  }
  
  function riderOfferSwap(shift: any) {
    if (window.confirm("Don't you want to swap shifts?")) {
        offerSwap(shift.shiftsToken, token)
        .then((res) => {
          console.log(res.data);

          toast.success("You have successfully sent a request to swap this shift🌟");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in Approving the product");
        });
    }
  }
      
  return (
    <div className="pt-5">
      <h1 className="font-extrabold text-center p-5 text-2xl uppercase text-green-700">My Shifts</h1>
        <Container maxWidth={"xl"}>
            
        <Grid container spacing={2}>
          {shifts != undefined
            ? shifts.map((shift: any, index: any) => {
                return (
                  <Grid item xl={4} lg={6} md={12} sm={6} xs={12} >
                    <Card elevation={10} >
                      <Grid container>
                     
                        <Grid item md={8} xs={12} >
                          <CardContent>
                            <Typography gutterBottom>
                              <div>
                              {shift.shiftStatus === ShiftStatus.Taken ? (
                                  <>
                                    <h1 className="text-green-600 font-bold font-serif">
                                      ( Taken )
                                    </h1>
                                  </>
                                ) :  (
                                  <>
                                    <h1 className="text-blue-600 font-bold font-serif">
                                      ( Offer Swaped )
                                    </h1>
                                  </>
                                )}
                              </div>
                              <div className="m">
                                <span className="font-bold text-gray-600">
                                  Date:
                                </span>
                               <span className="font-bold text-orange-600"> {printDate(shift.date)}</span>
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
                              <div className="text-1xl">
                                <span className="font-bold  text-gray-600">
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
                          md={4}
                          xs={12}
                          className="flex justify-center items-center "
                        >
                          <Box mr={2} mb={2}>
                            {shift.shiftStatus === ShiftStatus.Offer_swap ?(<>
                                <Link
                              to={`/employee/edit-shift/${shift.shiftsToken}`}
                            >
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => riderTakeShift(shift)}
                              >
                                Remove
                              </Button>
                            </Link>
                            </>)
                            
                            :(<>
                            <Link
                              to={`/employee/edit-shift/${shift.shiftsToken}`}
                            >
                              <Button
                                variant="contained" 
                                sx={{fontWeight:"bold"}}
                                onClick={() => riderOfferSwap(shift)}
                              >
                                Offer Swap
                              </Button>
                            </Link>
                            </>)}
                           
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
  )
}


export default MyShifts