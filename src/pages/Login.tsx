import React from "react";
import { Grid } from "@mui/material";
import FormLogin from "../components/Auth/Login/FormLogin";
type Props = {
  auth: any;
};
const Login = (props: Props) => {
  const { auth } = props;
  return (
    <div  className="color">
      <div className="pb-10">
        <Grid container spacing={2}>
          <Grid item xs={2} md={3} lg={4} className=""></Grid>
          <Grid item lg={4} md={6} xs={8} className="m-3 ">
            <div className="pt-20">
              <FormLogin auth={auth} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;