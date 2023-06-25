import { useEffect, useState } from "react";
import TotalData from "./TotalData";
import {
  totalEmployees,
  totalRiders,
  totalStores,
  totalUser,
} from "../../service/AdminService";

type Props = {};

const DataSummary = (props: Props) => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState<any>();
  const [stores, setStores] = useState<any>();
  const [riders, setRiders] = useState<any>();
  const [emp, setEmp] = useState<any>();
  useEffect(() => {
    totalUser(token).then((res) => {
      setUsers(res.data);
    });
    totalStores(token).then((res) => {
      setStores(res.data);
    });
    totalRiders(token).then((res) => {
      setRiders(res.data);
    });
    totalEmployees(token).then((res) => {
      setEmp(res.data);
    });
  }, []);

  return (
    <div className="px-20 py-5">
      <h1 className="text-4xl font-bold text-red-400 text-center">
        Data Summary
      </h1>
      <div className="px-20 pt-10">
        <div className="grid grid-cols-2">
          <TotalData title="Total User" result={users} color="blue" />
          <TotalData title="Total Store" result={stores} color="green" />

          <TotalData title="Total Riders" result={riders} color="red" />
          <TotalData title="Total Employee" result={emp}color="pink" />
        </div>
      </div>
    </div>
  );
};

export default DataSummary;