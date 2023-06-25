import { Box, Button, Container, Typography } from "@mui/material";

function ThankYouPage() {
  return (
    <Box
      sx={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            padding: "2rem",
            backgroundColor: "white",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "green",
            }}
          >
            Thank you for submitting your form!
          </Typography>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            You will receive an email soon.
          </Typography>
          <Box sx={{textAlign: "center"}}>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem" }}
            onClick={() => (window.location.href = "/")}
          >
            Go back
          </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ThankYouPage;