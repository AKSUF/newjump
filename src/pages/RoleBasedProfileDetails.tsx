import React, { useEffect, useState } from "react";
import { Grid, Typography, Divider, Box, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  acceptUserRole,
  getAllRoles,
  getDetails,
  getStoreName,
  rejectUserRole,
} from "../service/RoleBasedRegistration";
import { toast } from "react-toastify";
import RoleBased from "../Utils/RoleBased";
import { getPersonalProfile } from "../service/ProfileService";

const RoleBasedProfileDetails: React.FC = () => {
  const formStyle: React.CSSProperties = {
    width: "70%",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    margin: "auto",
    marginTop: "50px",
    marginBottom: "50px",
  };
  const { token } = useParams();
  const userToken = localStorage.getItem("token");
  const [user, setUser] = useState<any>();
  const [role, setRole] = useState<any>([]);
  const [store, setStore] = useState<any>([]);
  const navigate = useNavigate();



  useEffect(() => {
    getPersonalProfile(userToken)
    .then((res) => {
      const user = res.data;
      console.log(res.data);
    getDetails(userToken, token)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
       
      });
   getAllRoles()
       .then((res) => {
        console.log(res.data);
        setRole(res.data);
        return;
      })
      .catch((error) => {
        toast.error(error);
      });
    getStoreName()
      .then((res) => {
        setStore(res.data);
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


  const handleSendMessage = () => {
    console.log(userToken);
    // Make an API call to send the message to the seller
    rejectUserRole(  token,userToken)
      .then((res) => {
        // Display a success message to the user
        console.log(userToken);
        console.log(res.data);
        toast.success("Registration has been rejected");
        navigate("/admin/all-users-request")
        
      })
      .catch((error) => {
        // Display an error message to the user
        console.log(error);
        toast.error("Error ");
      });
  };

  function acceptUser(user: any) {
    if (window.confirm("Do you want to accept the user?")) {
      acceptUserRole(user.roleBasedDetailsId, userToken,token)
        .then((res) => {
          console.log(res.data);
          toast.success("The User is Accepted");
      
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in Approving the product");
        });
    }
  }

  return (
    <Box
      style={formStyle}
      display="flex"
      alignItems="center"
      boxShadow={3}
      p={2}
      borderRadius={8}
    >
     
      {user && (
        <>
         <Grid container spacing={2} >
              <Grid item xs={12} >
              <Box display={"flex"} justifyContent={"right"}>
              <Box >
              <Button variant="contained" color="primary"   onClick={() => acceptUser(user)}> Accept</Button>
              </Box>
                <Box mx={2}>
                <Button variant="contained" color="error"  onClick={handleSendMessage} > Reject</Button>
                </Box>
              </Box>
              
              </Grid>
              </Grid>
          <Avatar
            alt="Profile Picture"
            src={`/api/v1/unauthorize/image/${user.profile_image}`}
            sx={{
              width: 128,
              height: 128,
              mb: 2,
              boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            }}
          />
          <Typography variant="h4" mb={2}>
            Profile Details
          </Typography>
          <Divider />
          <Box mt={2} width="100%">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "gray" }}
                >
                  Name:{" "}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "goldenrod" }}
                >
                  {
                    role.find((p: any) => p.role_id === user.signUpRole.roleId)
                      ?.role_name
                  }
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "gray" }}
                >
                  Name:{" "}
                </Typography>
                <Typography variant="body1">{user.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "gray" }}
                >
                  Email
                </Typography>
                <Typography variant="body1">{user.signUpRole.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "gray" }}
                >
                  Phone
                </Typography>
                <Typography variant="body1">{user.phone_number}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "gray" }}
                >
                  Address
                </Typography>
                <Typography variant="body1">{user.address}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "gray" }}
                >
                  Gender
                </Typography>
                <Typography variant="body1">{user.gender}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "gray" }}
                >
                  Birthday
                </Typography>
                <Typography variant="body1">{user.birth}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "gray" }}
                >
                  District
                </Typography>
                <Typography variant="body1">{user.district}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                {user.signUpRole.roleId == RoleBased.Employee ? (
                  <>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "gray" }}
                    >
                      JumpStart Id
                    </Typography>{" "}
                    <Typography variant="body1">{user.jumpStartId}</Typography>
                  </>
                ) : user.signUpRole.roleId == RoleBased.Rider ? (
                  <>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "gray" }}
                    >
                      Type Of Vehicles
                    </Typography>
                    <Typography variant="body1">
                      {user.typeOfVehicles}
                    </Typography>
                  </>
                ) : user.signUpRole.roleId == RoleBased.Store ? (
                  <>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "gray" }}
                    >
                      Store
                    </Typography>
                    <Typography variant="body1">
                      {store.find((s: any) => s.id === user.storeId)?.name}
                    </Typography>
                  </>
                ) : (
                  <></>
                )}{" "}
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RoleBasedProfileDetails;