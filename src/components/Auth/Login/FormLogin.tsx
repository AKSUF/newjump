import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import React, { useState } from "react";
import Google from "../../../assets/google.png";
import { getRoles, login } from "../../../service/AuthService";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const initialFormData: FormData = {
  email: "",
  password: "",
};

type Props = {
  auth: any;
};

const FormLogin = (props: Props) => {
  const { auth } = props;
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [unAuthorizedMsg, setunAuthorizedMsg] = useState("");
  const navigate = useNavigate();

  const validate = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    if (validate()) {
      login(formData.email, formData.password)
        .then((res) => {
          localStorage.setItem("token", res.data.accessToken);
          getRoles(res.data.accessToken).then((res) => {
            const auths: any = [];
            res.data.roleResponses.forEach((role: string) => {
              auths.push(role.replace("ROLE_", ""));
            });
            auth({
              role: auths,
            });
            localStorage.setItem("authorization", JSON.stringify(auths));

            navigate(`/${auths[0].toLowerCase()}`);
          });
        })
        .catch((error) => {
          setunAuthorizedMsg("Incorrect Credentials, please renter!");
        });
    }
    setSubmitting(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="shadow-2xl p-5 bg-gray-50 rounded-3xl">
      <Typography
        variant="h4"
        className="text-center text-3xl py-5 pt-10 font-bold uppercase font-serif"
      >
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-red-500 text-lg">{unAuthorizedMsg}</p>
        </div>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
          fullWidth
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
          fullWidth
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          fullWidth
          size="large"
          className="bg-green-500 hover:bg-green-600 my-5 text-white font-bold py-3 px-6 rounded-lg"
        >
          Login
        </Button>
      </form>

      <Grid container className="my-3">
        <Grid item xs>
          <Link to="/forgot-password">
            <Typography variant="body1" className="cursor-pointer ">
              Forgot password?
            </Typography>
          </Link>
        </Grid>
      </Grid>

      <Box>
        <a href="http://localhost:8080/oauth2/authorize/google?redirectUrl=http://localhost:3000/oauth2/redirect">
          <button className=" bg-gray-50  mb-2 py-2 font-bold  shadow-md hover:bg-gray-100 w-full rounded-lg  ">
            <img
              className="w-[30px] inline-block h-8 mr-2"
              src={Google}
              alt="/"
            />{" "}
            Log in with Google
          </button>
        </a>

        <a
          href={
            "http://localhost:8080/oauth2/authorize/facebook?redirectUrl=http://localhost:3000/oauth2/redirect"
          }
        >
          <button className=" bg-blue-600 mt-2 py-2 font-bold w-full hover:bg-blue-700  700     text-white rounded-md  ">
            {/* <button className=" bg-green-600 py-2  my-1 font-bold  sm:text-[15px] text-[12px] mr-2 hover:bg-green-700  w-[56px]  text-white rounded-md mx-auto "> */}
            <FacebookIcon className="mr-3" />
            Log in with facebook
          </button>
        </a>
        <Grid container className="justify-center my-3">
          <Grid item>
            <Link to="/signup">
              <Typography variant="body1" className="cursor-pointer">
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default FormLogin;