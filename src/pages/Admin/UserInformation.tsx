import React from "react";
import { useEffect, useState } from "react";
import { deleUser, getUsers } from "../../service/ProfileService";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MultipleSelectRole from "../../components/Security/Security/MultipleSelectRole";
import { Link } from "react-router-dom";
import ViewMore from "../ViewMore";

type Props = {};
const UserInformation = (props: Props) => {
  const [users, setUsers] = useState<any>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    getUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteUser = (e: any) => {
    const token = localStorage.getItem("token");
    const index = e.target.dataset.index;
    const newUsers = users.slice(0, index).concat(users.slice(index + 1));
    console.log("Hi delete");

    deleUser(token, e.target.value)
      .then((res) => {
        setUsers(newUsers);
        toast.success(res.data);
      })
      .catch((error) => {
        toast.error("Delete User Fail, Please retry later!");
        console.error(error);
      });
  };

  return (
    <div className="py-5">
      <h1 className="text-4xl font-bold text-red-400 text-center">User Info</h1>

      <Grid container mt={2} spacing={2}>
        <Grid item lg={2} xs={0.1}></Grid>
        <Grid item lg={8} xs={10}>
          <div className="search">
            <div className="border border-red-400 rounded-lg flex p-3 w-64 shadow-sm shadow-red-300">
              <SearchIcon />
              <input
                type="search"
                className="ml-2 w-full h-full focus:outline-none"
                placeholder="Search Here"
              />
            </div>
          </div>
        </Grid>
        <Grid item lg={2} xs={0.1}></Grid>
        <Grid item lg={2} xs={0.1}></Grid>
        <Grid item lg={8} xs={10}>
          <div className="py-5 px-5">
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Position
              </InputLabel>
              <NativeSelect
                defaultValue={"all"}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
              >
                <option value={"all"}>All</option>
                <option value={"Admin"}>Admin</option>
                <option value={"User"}>User</option>
                <option value={"Employee"}>Employee</option>
                <option value={"Producer"}>Producer</option>
                <option value={"Rider"}>Rider</option>
                <option value={"Store"}>Store</option>
              </NativeSelect>
            </FormControl>
          </div>
        </Grid>
        <Grid item lg={2} xs={0.1}></Grid>
        <Grid item lg={2} xs={0.1}></Grid>
        <Grid item lg={8} xs={10}>
          <div className="p-4">
            <table className="table-auto border rounded-3xl">
              <thead className="">
                <tr className=" bg-gray-600 text-white">
                  <th className="p-5  border-r-2">No.</th>
                  <th className="p-5 border-r-2">Name</th>
                  <th className="p-5 border-r-2">Birth</th>
                  <th className="p-5 border-r-2">Phone No.</th>
                  <th className="p-5 border-r-2">Gender</th>
                  <th className="p-5 border-r-2">image</th>
                  <th className="p-5 border-r-2">Roles</th>
                  <th className="p-5 border-r-2">Actions</th>
                </tr>
              </thead>
              <tbody className="border border-3 ">
                {users != undefined
                  ? users?.map((user: any, index: any) => (
                      <tr className="border text-center ">
                        <td className="p-2 border">{index + 1}</td>
                        <td className="p-2 border">{user.name}</td>
                        <td className="p-2 border">{user.birth}</td>
                        <td className="p-2 border">{user.phone_number}</td>
                        <td className="p-2 border">{user.gender}</td>

                        {/* <td className="p-2 border" > <NativeSelect>
                            {user.stores.map((store:any) => (
                 
                     
                        <option value={store.store_id} key={store.store_id}>
                          {store.store_name}
                        </option>
                     
                   
                  ))} */}
                        {/* </NativeSelect></td>  */}
                        <td className="p-2 border">
                          {" "}
                          <img
                            className="w-[50px] shadow-red-300 shadow-sm text-center mr-1 h-14 rounded-3xl"
                            src={
                              user.profile_image?.startsWith("http")
                                ? user.profile_image
                                : `http://localhost:8080/api/v1/users/image/${user.profile_image}`
                            }
                            alt="/"
                          />
                        </td>
                        <td className="p-2 border">
                          <MultipleSelectRole userId={user.user_id} />
                        </td>
                        <td className="p-2 flex space-x-4">
                          <div className=" flex justify-center items-center">
                            <Link to={`/admin/edit-pro?userId=${user.user_id}`}>
                              <button className="p-2 bg-blue-500 rounded-md text-white mr-2">
                                Edit
                              </button>
                            </Link>
                            <button
                              className="p-2 bg-red-500 rounded-md text-white"
                              value={user.user_id}
                              data-index={index}
                              onClick={(e) => deleteUser(e)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </Grid>
        <Grid item lg={2} xs={0.1}></Grid>
      </Grid>

      <ViewMore />
    </div>
  );
};

export default UserInformation;