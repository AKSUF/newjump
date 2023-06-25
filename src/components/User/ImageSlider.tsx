import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

type Slide = {
  id: number;
  imageUrl: string;
  description:string;
};

type ImageSliderProps = {
  slides: Slide[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideStyle = "slide flex items-center justify-center h-[100%]";

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlideIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [slides]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Box position="relative">
    <Box
      sx={{
        
        height: "50vh",
      }}
    >
      {slides.map((slide, index) => (
      
       
        <Box
          key={slide.id}
          sx={{
            display: index === currentSlideIndex ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
           
            transition: "opacity 0.5s ease",
            opacity: index === currentSlideIndex ? 1 : 0,
          }}
        > <Grid container>
        <Grid    item md={6} xs={12}>
          <Box >

          <img src={slide.imageUrl} alt={`Slide ${slide.id}`} />
          </Box>
       
        </Grid>
        <Grid    item md={6} xs={12}>
          <h1>
            {slide.description}
          </h1>

        </Grid>
       </Grid>
       </Box>
        
      ))}
    </Box>
  </Box>
  );
};

export default ImageSlider;