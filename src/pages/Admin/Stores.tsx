import React, { useEffect, useState } from "react";
import { deleteStore, showAllStore } from "../../service/StoreService";
import { getPersonalProfile, getUsers } from "../../service/ProfileService";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import filteringProduct from "../../Utils/filteringProduct";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  role: String;
};
const Stores = (props: Props) => {
  const [stores, setStores] = useState<any>();
  const [allStores, setAllStores] = useState<any>();

  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        console.log(res.data);

        showAllStore(token)
          .then((res) => {
            setStores(res.data);
            setAllStores(res.data);
            return;
          })
          .catch((error) => {
            console.log(error);          });
      })
      .catch((error) => {
        console.log(error);      });
  }, []);

  const token = localStorage.getItem("token");
  // function to delete meal
  function deleteStoreDetails(store: any) {
    if (window.confirm("Are you sure")) {
      deleteStore(store.store_id, token)
        .then((data) => {
          console.log(data);
          toast.success("Store Details is delete");
          let newStoreContent = stores.filter(
            (m: any) => m.store_id != store.store_id
          );
          setStores([...newStoreContent]);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in deleting Store");
        });
    }
  }
  const filterStore = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filteringProduct(e, setStores, allStores);
  };

  return (
    <div>
      <div className="sm:m-4 ">
        <div className="">
          <h3 className="pt-2 text-2xl font-bold text-center underline ">
            Meals
          </h3>
          <Container maxWidth="xl">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box pt={6}>
                  <FormControl className="w-[200px] ">
                    <InputLabel
                      className="text-xl"
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Meals Type
                    </InputLabel>
                    <NativeSelect
                      defaultValue={"all"}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      onChange={(e) => filterStore(e)}
                    >
                      <option value={"all"}>All</option>
                      <option value={"Makeup"}>Makeup</option>
                      <option value={"Grocery"}>Grocery</option>
                      <option value={"Electronic"}>Electronic</option>
                      <option value={"Fruit"}>Fruit</option>
                      <option value={"Flower shop"}>Flower shop</option>
                      <option value={"Machinery"}>Machinery</option>
                      <option value={"Book Shop"}>Book Shop</option>
                      <option value={"Furniture Shop"}>Furniture Shop</option>
                      <option value={"Toys Shop"}>Toys Shop</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Grid container spacing={1}>
                    {stores != undefined
                      ? stores.map((store: any, index: any) => (
                          <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
                            <Card elevation={10}>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "center ",
                                }}
                              >
                                <CardMedia
                                  sx={{ width: "100%" ,height:"150px"}}
                                  component="img"
                                  className="h-400"
                                  alt="green iguana"
                                  image={`http://localhost:8080/api/v1/admin/store/image/${store.store_image}`}
                                />
                              </Box>
                              <CardContent>
                                <Typography gutterBottom>
                                  <div className="text-[15px]">
                                    <span className="font-bold ">
                                      Store Name
                                    </span>
                                    : {store.store_name}
                                  </div>
                                </Typography>
                                <Typography
                                  className="text-xl"
                                  color="text.secondary"
                                >
                                  <h3 className="text-[15px]">
                                    <span className="font-bold">Address: </span>
                                    {store.store_address}
                                  </h3>
                                  <h3>
                                    <h3 className="text-[15px]">
                                      <span className="font-bold">
                                        {" "}
                                        Is Opens:{" "}
                                      </span>{" "}
                                      {store.opens} to {store.closes}
                                    </h3>
                                  </h3>
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <>
                                  <Grid container>
                                    <Grid item xs={6}>
                                      <Link
                                        to={
                                          "/admin/store/" +
                                          store.store_id
                                        }
                                      >
                                        <Button
                                          variant="contained"
                                          color="primary"
                                        >
                                          {" "}
                                          Details
                                        </Button>
                                      </Link>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={6}
                                      display={"flex"}
                                      justifyContent={"right"}
                                    >
                                      <Link
                                        to={
                                          "/admin/update-store/" +
                                          store.store_id
                                        }
                                      >
                                        <button className="border m-1 p-1 text-sky-500">
                                          {" "}
                                          <EditIcon />
                                        </button>
                                      </Link>

                                      <button
                                        className="border m-1 text-red-500"
                                        onClick={() =>
                                          deleteStoreDetails(store)
                                        }
                                      >
                                        <DeleteIcon />
                                      </button>
                                    </Grid>
                                  </Grid>
                                </>
                              </CardActions>
                            </Card>
                          </Grid>
                        ))
                      : ""}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Stores;