import React from "react";
import AdminDash from "./ADMIN/AdminDash";
import { Grid } from "@mui/material";
import Content from "../Content";
import EmployeeDash from "./Employee/EmployeeDash";
import StoreDash from "./Store/StoreDash";
import ProducerDash from "./Manufacturer/ProducerDash";
import RiderDash from "./Rider/RiderDash";
import CourierDash from "./Courier/CourierDash";

type Props = {
  role: String;
};
function Sidebar(props: Props) {
  const { role } = props;
  return (
    <div>
      <div className="flex">
        <Grid container>
          <Grid
            item
            xl={2}
            lg={2.5}
            md={2.6}
            sm={2.7}
          
            className="   shadow-xl min-h-screen  test2" >
            <div className="lg:fixed  ">
              {role === "ADMIN" &&
              window.location.toString().includes("admin") ? (
                <AdminDash />
              ) : (
                <></>
              )}
              {role === "EMPLOYEE" ? <EmployeeDash /> : <></>}
              {role === "STORE" ? <StoreDash /> : <></>}
              {role === "PRODUCER" ? <ProducerDash /> : <></>}
              {role === "RIDER" ? <RiderDash /> : <></>}
              {role === "SHIPPING_COURIER" ? <CourierDash /> : <></>}
            </div>
          </Grid>
          <Grid item xl={10} lg={9.5} md={9.4}   sm={9.3}  xs={12}>
            <div className="p-2 ">
              <Content />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Sidebar;