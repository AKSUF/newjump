import React, { useEffect, useState } from "react";
import { getPersonalProfile } from "../../service/ProfileService";
import {
  getAllRoles,
  getAllUsers,
  getStoreName,
} from "../../service/RoleBasedRegistration";
import { toast } from "react-toastify";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import filteringProduct from "../../Utils/filteringProduct";
import filterRole from "../../Utils/filterRole";

const AllRoleBasedRegistratuinReq = () => {
  const [users, setUsers] = useState<any>();
  const token: any = localStorage.getItem("token");
  const [role, setRole] = useState<any>([]);
  const [store, setStore] = useState<any>([]);
  const [allroles, setAllRoles] = useState<any>();


  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        const user = res.data;
        console.log(res.data);

        getAllUsers(token)
          .then((res) => {
            setUsers(res.data);
            return;
          })
          .catch((error) => {
            console.log(error);
            
                    });
        getAllRoles()
          .then((res) => {
            console.log(res.data);
            setRole(res.data);
            setAllRoles(res.data);
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

  const filteringRoles = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterRole(e, setRole, allroles,role);
  };


  return (
    <div className="m-10 md:m-4">
      <Container maxWidth="xl">
      <Box mb={6}>
                <FormControl className="w-[200px] ">
                  <InputLabel
                    className="text-xl"
                    variant="standard"
                    htmlFor="uncontrolled-native"
                  >
                    Product Type
                  </InputLabel>
                  <NativeSelect
                    defaultValue={"all"}
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native",
                    }}
                    onChange={(e) => filteringRoles(e)}
                  >
                    <option value={"all"}>All</option>
                    <option value={"ROLE_EMPLOYEE"}>Role Employee</option>
                    <option value={"ROLE_PRODUCER"}>Role Producer</option>
                    <option value={"ROLE_RIDER"}>Role Rider</option>
                    <option value={"ROLE_STORE"}>Role Store</option>
                    
                  </NativeSelect>
                </FormControl>
              </Box>
      <Table className="border">
        <TableHead style={{ backgroundColor: "#662b25" }}>
          <TableRow>
            <TableCell
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                border: "solid 2px white",
              }}
            >
              No
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                border: "solid 2px white",
              }}
            >
              Image
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: "18px",
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
                fontSize: "18px",
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
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                border: "solid 2px white",
              }}
            >
              Role
            </TableCell>
            <TableCell
              style={{
                color: "#fff",
                fontSize: "18px",
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
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                border: "solid 2px white",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users != undefined
            ? users.map((user: any, index: any) => (
                <TableRow
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ECECEC")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                >
                  <TableCell className="border" style={{ textAlign: "center" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className="border"
                    style={{ textAlign: "center", margin: "auto" }}
                  >
                    <Avatar
                      alt="Profile Picture"
                      src={`/api/v1/unauthorize/image/${user.profile_image}`}
                      sx={{
                        width: 80,
                        height: 80,
                        textAlign: "center",
                        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
                      }}
                    />
                  </TableCell>

                  <TableCell
                    className="border"
                    style={{ textAlign: "center", fontSize: "18px" }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell
                    className="border"
                    style={{ textAlign: "center", fontSize: "18px" }}
                  >
                    {user.signUpRole.email}
                  </TableCell>

                  
                  <TableCell
                    className="border"
                    style={{ textAlign: "center",color:"darkgreen", fontSize: "18px" }}
                  >
                    {
                      role.find(
                        (p: any) => p.role_id === user.signUpRole.roleId
                      )?.role_name
                    }
                  </TableCell>
                  <TableCell
                    className="border"
                    style={{ textAlign: "center", fontSize: "18px" }}
                  >
                    {user.address} <br />
                    {user.district}
                  </TableCell>

                  <TableCell
                    className="border"
                    style={{ textAlign: "center", fontSize: "18px" }}
                  >
                    <Link to={`/admin/user-request/${user.signUpRole.token}`}>
                      <Button variant="contained" color="primary">
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            : ""}
        </TableBody>
      </Table>
      </Container>
    </div>
  );
};

export default AllRoleBasedRegistratuinReq;