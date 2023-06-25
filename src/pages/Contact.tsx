import React from "react";
import "../styles/Contact.css";
import {
  Box,
  Grid,
  Container,
  Card,
  CardContent,
  CardHeader,
  Paper,
  TextField,
} from "@mui/material";

import ContactImg from "../assets/about/banner (2).avif";
const Contact = () => {
  return (
    <div>
   
      <div className="banners justify-between   items-center ">
        <div className=" justify-between items-center">
          <Container maxWidth="lg" className="md:pt-16 ">
            <Grid
              container
              mt={0}
              spacing={1}
              className="justify-between items-center p-8   bg-gray-800 bg-opacity-30"
            >
              <Grid item md={5} sm={7} xs={12}>
                <Box textAlign="center" className="">
                  <img
                    className=" sm:w-[70%] w-[50%]  text-center inline-block"
                    src={ContactImg}
                    alt="/"
                  />
                  <Box p={0}>
                    
                
                  </Box>
                  <div>
                    <h1 className="text-[40px] text-[#e9985e]">We're Here 24/7</h1>
                    <button className="bg-sky-800 p-2 rounded-md hover:bg-sky-700" >Chat Here</button>
                  </div>
                </Box>
              </Grid>

              <Grid item md={6} sm={5} xs={12}>
                <Box  className="rounded-lg ">
                  <Card elevation={10}>
                    <CardHeader
                      title="Contact Us"
                      className="text-center  uppercase font-extrabold bg-gray-200"
                    ></CardHeader>
                    <CardContent>
                      <form>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              type="email"
                              label="Email"
                              variant="standard"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              type="password"
                              label="Password"
                              variant="standard"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Message"
                              multiline
                              rows={3}
                              placeholder="Write your message here"
                              variant="outlined"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12} className="text-center">
                            <button
                              className="bg-blue-900 text-white p-2 rounded-md hover:bg-blue-800"
                            >
                              Submit
                            </button>
                          </Grid>
                        </Grid>
                      </form>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    
    
    </div>
  );
};

export default Contact;