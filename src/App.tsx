import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PublicHome from "./components/For all users/PublicHome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Product from "./pages/Product";
import ProtectedRoute from "./components/Security/Security/ProtectedRoute";
import UserHome from "./components/User/UserHome";
import EditProfile from "./pages/EditProfile";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import OAuthRedirect from "./components/Security/Security/OAuthRedirect";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Admin/Stores";
import AddStore from "./pages/Admin/AddStores";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import EditProduct from "./pages/EditProduct";
import AddToCart from "./pages/User/AddToCart";
import UserInformation from "./pages/Admin/UserInformation";
import DeliverOrderAddress from "./pages/DeliveryOrderAddress";
import EditDeliveryAddress from "./pages/User/EditDeliveryAddress";
import PaymentMethod from "./pages/PaymentMethod";
import PayWithStripe from "./pages/PayWithStripe";
import MyOrders from "./pages/User/MyOrders";
import DeliveryStatusComponent from "./pages/Try";
import PendingProducts from "./pages/PendingProducts";
import BuyProduct from "./pages/Shopkeeper/BuyProduct";
import MyOrder from "./pages/Manufacturer/MyOrder";
import AcceptedOrder from "./pages/Manufacturer/AcceptedOrder";
import BuyProductDetails from "./pages/Shopkeeper/BuyProductDetails";
import CashOnDeliveryDetails from "./pages/User/CashOnDeliveryDetails";
import RoleBasedForm from "./components/Auth/Register/RoleBasedForm";
import EmployeeDetails from "./pages/Employee/EmployeeDetails";
import ThankYouPage from "./components/For all users/ThankYouPage";
import RiderDetails from "./pages/Rider/RiderDetails";
import ShopkeeperDetails from "./pages/Shopkeeper/ShopkeeperDetails";
import ManufacturerDetails from "./pages/Manufacturer/ManufacturerDetails";
import RoleBasedProfileDetails from "./pages/RoleBasedProfileDetails";
import AllRoleBasedRegistratuinReq from "./pages/Admin/AllRoleBasedRegistratuinReq";
import EditStore from "./pages/Admin/EditStore";
import SetShifts from "./pages/Employee/SetShifts";
import EditShiftForm from "./pages/Employee/EditShiftForm";
import AvailableShiftsForRider from "./pages/Rider/AvailableShiftsForRider";
import MyShifts from "./pages/Rider/MyShifts";
import RiderOrders from "./pages/Rider/OrderListForRider";
import OrderListForRider from "./pages/Rider/OrderListForRider";
import DeliveryDetails from "./pages/DeliveryDetails";
import RiderDeliveryDetails from "./pages/Rider/RiderDetails";
import OrderDelivery from "./pages/Rider/OrderDelivery.";
import AllRiderDeliveryDetails from "./pages/Employee/AllRiderDeliveryDetails";
import ShippingCourier from "./pages/Employee/ShippingCourier";
import LatestDeliveryOrder from "./pages/Courier/LatestDeliveryOrder";
import DeliveredProduct from "./pages/Courier/DeliveredProduct";
import StoreDetails from "./pages/Admin/StoreDetails";
import OrderDeliveryDetails from "./pages/OrderDeliveryDetails";
import StoreProducts from "./pages/Shopkeeper/StoreProducts";
import Orders from "./pages/Shopkeeper/Orders";
import DataSummary from "./pages/Admin/DataSummary";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";



function App() {
  let roles: any = localStorage.getItem("authorization");
  let arrayRoles = roles ? JSON.parse(roles) : null;
  const [auth, setAuth] = useState({
    role: arrayRoles != null && arrayRoles.length > 0 ? arrayRoles : [],
  });

  useEffect(() => {
    setAuth({
      role: arrayRoles != null && arrayRoles.length > 0 ? arrayRoles : [],
    });
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ToastContainer position='top-center'/>
      <Routes>
      <Route
          path={"/oauth2/redirect"}
          element={<OAuthRedirect auth={setAuth} />} />






<Route
          element={<ProtectedRoute isAllowed={auth.role?.includes("ADMIN")} />}>
          <Route path={"/admin"} element={<Dashboard role={"ADMIN"} />}>
          <Route index element={<DataSummary />}></Route>
          <Route path={"home"} element={<DataSummary  />}></Route>
          <Route path={"add-store"} element={<AddStore />}></Route>
          <Route path={"edit-pro"} element={<EditProfile action="edit" />} ></Route>
          <Route path={"stores"} element={<Stores role={"ADMIN"}/>} />
          <Route path={"store/:store_id"} element={<StoreDetails />} />
          <Route path={"products"} element={<Product role={"ADMIN"}/>} />
          <Route path={"pending-product"} element={<PendingProducts role={"ADMIN"}/>} />
          <Route path={"profile"} element={<Profile role={"ADMIN"} />}></Route>
          <Route path={"profile/:user_id"} element={<Profile role={"ADMIN"} />}></Route>
          <Route path={"all-users"} element={<UserInformation />}></Route>
          <Route path={"all-users-request"} element={<AllRoleBasedRegistratuinReq />}></Route>
          <Route path={"edit-pro"} element={<EditProfile action="edit" />} ></Route>
          <Route path={"user-request/:token"} element={<RoleBasedProfileDetails  />} />
          <Route path={"product-details/:productId"} element={<ProductDetails role={"ADMIN"} />}  />
          <Route path={"update-store/:store_id"} element={<EditStore />} ></Route>
          <Route path={"rider-delivery"} element={<AllRiderDeliveryDetails  role={"ADMIN"}/>} ></Route>
            <Route path={"courier-delivery"} element={<ShippingCourier />} ></Route>
            <Route path={"delivery-details/:deliveryId"} element={<OrderDeliveryDetails />} ></Route>

          </Route>
        </Route>




        <Route path="/" element={<Home role={auth.role.length > 0 ? auth.role[0] : ""} />} >
          <Route index element={<PublicHome role={""}/>}></Route>
          <Route path={"login"} element={<Login auth={setAuth} />} />
          <Route path={"edit"} element={<DeliveryStatusComponent  />} ></Route>
          <Route path={"role/register"} element={<RoleBasedForm />} />
          <Route path={"employee/:token"} element={<EmployeeDetails />} />
          <Route path={"products"} element={<Product role={""}/>} />
          <Route path={"rider/:token"} element={<RiderDetails />} />
          <Route path={"store/:token"} element={<ShopkeeperDetails />} />
          <Route path={"producer/:token"} element={<ManufacturerDetails/>} />
          <Route path={"register"} element={<Registration auth={setAuth} />} />
          <Route path={"product"} element={<Product role={""} />} />
          <Route path={"thank-you"} element={<ThankYouPage />} />
          <Route path={"about-us"} element={<AboutUs />} />
          <Route path={"contact-us"} element={<Contact />} />
          <Route path={"product-details/:productId"} element={<ProductDetails role={"USER"} />}  />
          <Route path={"creatProfile"} element={<EditProfile action="submit" />} ></Route>
        </Route>



      <Route
          element={<ProtectedRoute isAllowed={auth.role?.includes("USER")} />} >
          <Route path={"/user"} element={<Home role={"USER"} />}>
            <Route index element={<UserHome role={"USER"} />}></Route>
            <Route path={"delivery-form/:productId/:quantity"} element={<DeliverOrderAddress />} />
            <Route path={"home"} element={<UserHome role={"USER"} />} />
            <Route path={"profile"} element={<Profile role={"USER"} />} ></Route>
            <Route path={"edit-pro"} element={<EditProfile action="edit" />} ></Route>
            <Route path={"products"} element={<Product role={"USER"}/>} />
            <Route path={"cart"} element={<AddToCart />} />
            <Route path={"my-orders"} element={<MyOrders />} />
            <Route path={"product-details/:productId"} element={<ProductDetails role={"USER"} />}  />
            <Route path={"cash-on-delivery/:delivery_id"} element={<CashOnDeliveryDetails />}  />
            <Route path={"edit-address/:delivery_details_id"} element={<EditDeliveryAddress />} ></Route>
            <Route path={"payment-process/:delivery_details_id/:productId/:quantity"} element={<PaymentMethod />} />
            <Route path={"strip-payment-process/:delivery_details_id/:productId/:quantity"} element={<PayWithStripe />} />
           

          </Route>
        </Route>

             
      <Route element={<ProtectedRoute isAllowed={auth.role?.includes("STORE")} />} >
          <Route path={"/store"} element={<Dashboard role={"STORE"} />}>
            <Route index element={<AddProduct />}></Route>
            <Route path={"home"} element={<UserHome role={"STORE"} />} />
            <Route path={"add-product"} element={<AddProduct />}></Route>
            <Route path={"store-products"} element={<StoreProducts role={"STORE"} />}></Route>
             <Route path={"profile"} element={<Profile role={"STORE"} />} ></Route>
             <Route path={"product"} element={<Product role={"STORE"}/>} />
             <Route path={"buy-product"} element={<BuyProduct role={"STORE"}/>} />
             <Route path={"product-pending"} element={<PendingProducts role={"STORE"}/>} />
             <Route path={"order-products"} element={<Orders role={"STORE"}/>} />
             <Route path={"buy-product-details/:buyProductId"} element={<BuyProductDetails  />}  />
            <Route path={"edit-pro"} element={<EditProfile action="edit" />} ></Route>
            <Route path={"product-details/:productId"} element={<ProductDetails role={"STORE"} />}  />
            <Route path={"update-product/:productId"} element={<EditProduct />} ></Route>
          </Route>
        </Route>



        
      <Route element={<ProtectedRoute isAllowed={auth.role?.includes("EMPLOYEE")} />} >
          <Route path={"/employee"} element={<Dashboard role={"EMPLOYEE"} />}>
            <Route index element={<AddProduct />}></Route>
            <Route path={"home"} element={<UserHome role={"EMPLOYEE"} />} />
            <Route path={"add-product"} element={<AddProduct />}></Route>
             <Route path={"profile"} element={<Profile role={"EMPLOYEE"} />} ></Route>
             <Route path={"product"} element={<Product role={"EMPLOYEE"}/>} />
             <Route path={"set-shift"} element={<SetShifts/>} />
             <Route path={"edit-shift/:shifttoken"} element={<EditShiftForm />} />
             <Route path={"product-pending"} element={<PendingProducts role={"EMPLOYEE"}/>} />
            <Route path={"edit-pro"} element={<EditProfile action="edit" />} ></Route>
            <Route path={"product-details/:productId"} element={<ProductDetails role={"EMPLOYEE"} />}  />
            <Route path={"update-product/:productId"} element={<EditProduct />} ></Route>
            <Route path={"rider-delivery"} element={<AllRiderDeliveryDetails  role={"EMPLOYEE"}/>} ></Route>
            <Route path={"courier-delivery"} element={<ShippingCourier />} ></Route>
            <Route path={"delivery-details/:deliveryId"} element={<OrderDeliveryDetails />} ></Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute isAllowed={auth.role?.includes("PRODUCER")} />} >
          <Route path={"/producer"} element={<Dashboard role={"PRODUCER"} />}>
            <Route index element={<UserHome role={"PRODUCER"}/>}></Route>
            <Route path={"home"} element={<UserHome role={"PRODUCER"} />} />
            <Route path={"orders"} element={<MyOrder/>} />
            <Route path={"buy-product-details/:buyProductId"} element={<BuyProductDetails  />}  />
            <Route path={"accept-orders"} element={<AcceptedOrder/>} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute isAllowed={auth.role?.includes("RIDER")} />} >
          <Route path={"/rider"} element={<Dashboard role={"RIDER"} />}>
            <Route index element={<UserHome role={"RIDER"}/>}></Route>
            <Route path={"available-shift"} element={<AvailableShiftsForRider/>} />
            <Route path={"my-shift"} element={<MyShifts/>} />
            <Route path={"orders"} element={<OrderListForRider/>} />
            <Route path={"order-details/:delivery_id"} element={<RiderDeliveryDetails/>} />
            <Route path={"my-order-delivery"} element={<OrderDelivery/>} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute isAllowed={auth.role?.includes("SHIPPING_COURIER")} />} >
          <Route path={"/shipping_courier"} element={<Dashboard role={"SHIPPING_COURIER"} />}>
            <Route index element={<UserHome role={"SHIPPING_COURIER"}/>}></Route>
            <Route path={"latest-delivery"} element={<LatestDeliveryOrder/>} />
            <Route path={"delivered-product"} element={<DeliveredProduct/>} />
           
          </Route>
        </Route>
        </Routes>

    </BrowserRouter>
  );
}

export default App;
