import React, { useEffect, useState } from "react";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import myImage from "../assets/caregiver.png";
import { Link } from "react-router-dom";
import { getPersonalProfile } from "../service/ProfileService";

type Props = {
  role: string;
};
export default function Profile(props: Props) {
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
  const { role } = props;
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    getPersonalProfile(token)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {role ==="USER"?(<>
                <Box display={"flex"} justifyContent={"right"}>
                <Link
                  to={`/${role.toLowerCase()}/edit-pro?userId=${user.user_id}`}
                >
                  <button className="py-1 px-3 text-white font-bold m-1 hover:bg-sky-700 text-center text-[15px] bg-sky-800">
                    Edit
                  </button>
                </Link>
              </Box>
              </>):(<>
              </>)}
             
            </Grid>
          </Grid>
          <Avatar
            alt="Profile Picture"
            src={`http://localhost:8080/api/v1/users/image/${user.profile_image}`}
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
                <Typography variant="body1">{user.name}</Typography>
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
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}
{

}