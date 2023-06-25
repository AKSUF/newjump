import React, { useEffect, useState } from "react";
import { riderDistrictbasedShift, takeShift } from "../../service/SetShifts";
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShiftStatus from "../../Utils/ShiftStatus";
import { toast } from "react-toastify";
import { getPersonalProfile } from "../../service/ProfileService";
const AvailableShiftsForRider = () => {

    const [shifts, setShifts] = useState<any>();
    const token = localStorage.getItem("token");

 
  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        console.log(res.data);
    riderDistrictbasedShift(token)
      .then((res) => {
        let availableShifts = res.data.filter((shift: any) => shift.shiftStatus === "Available"|| shift.shiftStatus === "Offer_swap");
        console.log(availableShifts);
        setShifts(availableShifts);

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

  function riderTakeShift(shift: any) {
    if (window.confirm("Do you want to approve the product?")) {
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
  return (
    <div className="pt-5">
      <h1 className="font-extrabold text-center p-5 text-2xl uppercase text-green-700">Available Shifts</h1>
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
                              {shift.shiftStatus === ShiftStatus.Available ? (
                                  <>
                                    <h1 className="text-green-600 font-bold font-serif">
                                      ( Available )
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
                          <Box m={2}>
                            <Link
                              to={`/employee/edit-shift/${shift.shiftsToken}`}
                            >
                              <Button
                                variant="contained"
                                onClick={() => riderTakeShift(shift)}
                              >
                                Take
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
  )
}

export default AvailableShiftsForRider