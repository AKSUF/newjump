import React, { useEffect } from "react";
import Footer from '../components/Layout/Footer/Footer'
import { useNavigate, } from 'react-router-dom';
import { Grid } from "@mui/material";
import DashNav from "../components/Dashboard/ADMIN/DashNav";
import Sidebar from "../components/Dashboard/Sidebar";
import EmployeeDashNav from "../components/Dashboard/Employee/EmployeeDashNav";
import StoreDashNav from "../components/Dashboard/Store/StoreDashNav";
import ProducerDashNav from "../components/Dashboard/Manufacturer/ProducerDashNav";
import RiderDashNav from "../components/Dashboard/Rider/RiderDashNav";
import CourierDash from "../components/Dashboard/Courier/CourierDash";
import CourierDashNav from "../components/Dashboard/Courier/CourierDashNav";
type Props = {
    role: String;
  };
function Dashboard (props: Props) {
    const { role } = props;
    const navigate = useNavigate();
    const token: any = localStorage.getItem("token");
    useEffect(() => {
      if (role.length > 0 && token.length > 0) {
        navigate(`/${role.toLowerCase()}`, { replace: true });
      }
    }, []);
  return (
    <div >
          <Grid container spacing={1}  className="">
         <Grid xs={12}>
         {role === "ADMIN" && window.location.toString().includes("admin") ? (
             <DashNav role={role} />
          ) : (
            <></>
          )}
            {role === "EMPLOYEE" ? <EmployeeDashNav role={role}/> : <></>}
            {role === "STORE" ? <StoreDashNav role={role}/> : <></>}
            {role === "PRODUCER" ? <ProducerDashNav role={role}/> : <></>}
            {role === "RIDER" ? <RiderDashNav role={role} /> : <></>}
            {role === "SHIPPING_COURIER" ? <CourierDashNav role={role} /> : <></>}


          
          
        
          
          </Grid>
            
           
        <Grid item xs={12}  >
       
        <Sidebar role={role} />
      
     
      </Grid>
      </Grid>
      <Footer />
    </div>
  )
}

export default Dashboard

