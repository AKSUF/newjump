import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { getPersonalProfile } from "../../service/ProfileService";
  import {
    getAllStoreAccount,
    getStoreSingleDetails,
  } from "../../service/StoreService";
  import { Link, useParams } from "react-router-dom";
  
  const StoreDetails = () => {
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
    const { store_id } = useParams();
    const [store, setStore] = useState<any>();
    const [storeAccount, setStoreAccount] = useState<any>();
    const token: any = localStorage.getItem("token");
    useEffect(() => {
      getPersonalProfile(token)
        .then((res) => {
          console.log(res.data);
          getStoreSingleDetails(store_id, token)
            .then((res) => {
              console.log(res.data);
              setStore(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
          getAllStoreAccount(store_id, token)
            .then((res) => {
              console.log(res.data);
              setStoreAccount(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    return (
      <div>
        <Box
          style={formStyle}
          display="flex"
          alignItems="center"
          boxShadow={3}
          p={2}
          borderRadius={8}
        >
          {store && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}></Grid>
              </Grid>
              <Avatar
                alt="Profile Picture"
                src={`http://localhost:8080/api/v1/admin/store/image/${store.store_image}`}
                sx={{
                  width: 200,
                  height: 200,
                  mb: 2,
                  boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
                }}
              />
              <Typography variant="h6" mb={2} sx={{ fontWeight: "bold" }}>
                Store Details
              </Typography>
              <Divider />
              <Box mt={2} width="100%">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "gray" }}
                      className="underline underline-offset-2"
                    >
                      Store Name:{" "}
                    </Typography>
                    <Typography variant="body1">{store.store_name}</Typography>
                  </Grid>
  
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "gray" }}
                      className="underline underline-offset-2"
                    >
                      Store address:
                    </Typography>
                    <Typography variant="body1">{store.store_address}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "gray" }}
                      className="underline underline-offset-2"
                    >
                      Category
                    </Typography>
                    <Typography variant="body1">{store.category}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "gray" }}
                      className="underline underline-offset-2"
                    >
                      Available Days
                    </Typography>
                    <Typography variant="body1">{store.availableDays}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "gray" }}
                      className="underline underline-offset-2"
                    >
                      Opens & Closes
                    </Typography>
                    <Typography variant="body1">
                      {store.opens} - {store.closes}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "gray" }}
                      className="underline underline-offset-2"
                    >
                      Description
                    </Typography>
                    <Typography variant="body1">{store.store_desc}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
        <Container maxWidth="xl">
          <div className="m-10 md:m-4">
            <Table className="border">
              <TableHead style={{ backgroundColor: "#d39393" }}>
                <TableRow>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Profile Image
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Phone Number
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    Address
                  </TableCell>
  
                  <TableCell
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "solid 2px white",
                    }}
                  >
                    More
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storeAccount != undefined
                  ? storeAccount.map((sa: any, index: any) => (
                      <TableRow
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#ECECEC")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "")
                        }
                      >
                        <TableCell
                        className="text-center border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "156x",
                          }}
                        >
                          <Avatar
                          
                            alt="Profile Picture"
                            src={`http://localhost:8080/api/v1/users/image/${sa.user.profile_image}`}
                            sx={{
                              width: 60,
                              height: 60,
  
                              boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
                            }}
                          />
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "156x",
                          }}
                        >
                          {sa.user.name}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          {sa.email}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          {sa.user.phone_number}
                        </TableCell>
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          {sa.user.address}, {sa.user.district}
                        </TableCell>
  
                        <TableCell
                          className="border"
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="info"
                            sx={{ fontWeight: "bold" }}
                          >
                            <Link to={`/admin/profile/${sa.user.user_id}`}>
                            Details
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : ""}
              </TableBody>
            </Table>
          </div>
        </Container>
      </div>
    );
  };
  
  export default StoreDetails;