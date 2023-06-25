import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  getAllRoles,
  roleBasedLogin,
} from "../../../service/RoleBasedRegistration";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RoleBased from "../../../Utils/RoleBased";
import { v4 as uuidv4 } from "uuid";

const RoleBasedForm = () => {
  const navigate = useNavigate();

  const signUpRoleId = uuidv4();

  const formStyle: React.CSSProperties = {
  
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    margin: "auto",
  };

  const [roles, setRoles] = useState<any>([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
    roleId: "",
    token: uuidv4(),
  });

  useEffect(() => {
    getAllRoles()
      .then((res) => {
        console.log(res.data);
        setRoles(res.data);

        return;
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (user.password.length < 6) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (user.roleId === "") {
      toast.error("Store category is Required");
      return;
    }
    roleBasedLogin(user)
      .then((res) => {
        const matchingRole = roles.find((p: any) => p.role_id === user.roleId);
        if (matchingRole.role_id === RoleBased.Employee) {
          navigate("/employee/" + user.token);
        } else if (matchingRole.role_id === RoleBased.Producer) {
          navigate("/producer/" + user.token);
        } else if (matchingRole.role_id === RoleBased.Rider) {
          navigate("/rider/" + user.token);
        } else {
          navigate("/store/" + user.token);
        }

        toast.success("Registration successfull");
        setUser({
          email: "",
          password: "",
          roleId: "",
          token: uuidv4(),
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Registration failed");
      });
  };

  const handleChange = (event: any, field: any) => {
    let actualValue = event.target.value;
    setUser({
      ...user,
      [field]: actualValue,
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      p={10}
      className="role"
    >
      <form style={formStyle} onSubmit={handleSubmit}>
        <Typography variant="h4" fontWeight={"bold"} textAlign={"center"} gutterBottom>
          Registration Form
        </Typography>
        <TextField
          style={{ margin: "10px 0", width: "100%" }}
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={(e) => handleChange(e, "email")}
        />
        <TextField
          style={{ margin: "10px 0", width: "100%" }}
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => handleChange(e, "password")}
        />
        <FormControl style={{ margin: "10px 0", width: "100%" }}>
          <InputLabel id="roleId">Select Role</InputLabel>
          <Select
            labelId="Role"
            name="roleId"
            value={user.roleId}
            onChange={(e) => handleChange(e, "roleId")}
          >
            {roles.map((r: any) => (
              <MenuItem key={r.role_id} value={r.role_id}>
                {r.role_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          style={{ margin: "20px 0", width: "100%" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RoleBasedForm;