import React from "react";
import Navbar from "../components/Layout/Navbar/Navbar";
import { Box, Container, Grid } from "@mui/material";
import FreeOrder from "../assets/delivery.png";
import Rider from "../assets/delivery.png";
import Caregiver from "../assets/about/caregiver.avif";

const AboutUs = () => {
  return (
    <div>
      <div>
        <h1 className="text-center font-serif bg-gray-200 text-3xl  p-2 m-0 font-bold text-red-600 uppercase">
          About Us
        </h1>
      </div>

      <div className="mb-5">
        <Container maxWidth="xl">
          <div className="">
            <div>
              <Grid
                container
                mt={0}
                spacing={2}
                className="justify-between items-center"
              >
                <Grid item md={4} sm={12} xs={12}>
                  <Box>
                    <img
                      className=" sm:w-[250px] w-[200px] mx-auto py-2"
                      src={FreeOrder}
                      alt="/"
                    />
                  </Box>
                </Grid>
                <Grid item md={8} sm={12} xs={12}>
                  <Box>
                    <h1 className="text-center font-bold text-red-800 text-3xl pb-6 underline-offset-8 uppercase underline decoration-gray-800">
                      Products
                    </h1>
                    <span className="text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Laudantium dolore reiciendis et? Est iste cupiditate nam
                      qui. Architecto quos sit incidunt ipsa alias sint
                      doloremque, nesciunt, sed in eaque qui doloribus tempore
                      distinctio blanditiis dicta nulla sequi repellendus vel
                      ad. Ipsam repellendus quae enim laborum, dignissimos
                      soluta omnis sed esse reprehenderit beatae ipsum cum
                      quaerat incidunt rem quos aperiam similique? Mollitia
                      porro, quaerat cum quia voluptates facere repellendus
                      corporis tenetur quidem perferendis deleniti reprehenderit
                      ducimus sunt, facilis eius adipisci unde, vel voluptatum
                      amet. Ducimus facilis atque repudiandae nesciunt
                      distinctio reprehenderit quibusdam perferendis quis dicta
                      fugit, officiis veritatis, neque culpa magnam?
                    </span>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </div>

          <div style={{ borderTop: "1px solid gray  " }}></div>

          <div style={{ borderTop: "1px solid gray  " }} className="mx-1"></div>

          {/* About Volunteer */}
          <div className="bg-white">
            {/* <Container maxWidth="xl"> */}
            <div>
              <Grid
                container
                mt={0}
                spacing={2}
                className="justify-between items-center"
              ></Grid>
            </div>
          </div>
          <div style={{ borderTop: "1px solid gray  " }}></div>

          <div>
            <Grid
              container
              mt={0}
              spacing={2}
              className="justify-between items-center"
            >
              {/* About Riders  */}

              <Grid item md={4} sm={12} xs={12}>
                <Box>
                  <img
                    className=" sm:w-[250px] w-[200px] mx-auto py-2"
                    src={Rider}
                    alt="/"
                  />
                </Box>
              </Grid>

              <Grid item md={8} sm={12} xs={12}>
                <Box>
                  <h1 className="text-center font-bold text-red-800 text-3xl pb-6 underline-offset-8 uppercase underline decoration-gray-800">
                    About Riders
                  </h1>
                  <span className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Laudantium dolore reiciendis et? Est iste cupiditate nam
                    qui. Architecto quos sit incidunt ipsa alias sint
                    doloremque, nesciunt, sed in eaque qui doloribus tempore
                    distinctio blanditiis dicta nulla sequi repellendus vel ad.
                    Ipsam repellendus quae enim laborum, dignissimos soluta
                    omnis sed esse reprehenderit beatae ipsum cum quaerat
                    incidunt rem quos aperiam similique? Mollitia porro, quaerat
                    cum quia voluptates facere repellendus corporis tenetur
                    quidem perferendis deleniti reprehenderit ducimus sunt,
                    facilis eius adipisci unde, vel voluptatum amet. Ducimus
                    facilis atque repudiandae nesciunt distinctio reprehenderit
                    quibusdam perferendis quis dicta fugit, officiis veritatis,
                    neque culpa magnam?
                  </span>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutUs;
