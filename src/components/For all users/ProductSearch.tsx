import React, { useEffect, useState } from "react";

import { getAllProducts, searchProduct } from '../../service/ProductService';
import { toast } from "react-toastify";
import { SearchOutlined } from "@mui/icons-material";
import { getPersonalProfile } from "../../service/ProfileService";

const ProductSearch = () => {

    const token: any = localStorage.getItem("token");
    const [search, setSearch] = useState<any>();
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");


    useEffect(() => {
        getPersonalProfile(token)
          .then((res) => {
            console.log(res.data);
    
            getAllProducts(token)
              .then((res) => {
                setSearch(res.data);
                
                
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
    
  return (
    <div>
        








                  <ul
       
      >
         <div className="flex  rounded">
         <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter country name"
            
            className={`placeholder:text-gray-700 p-2 outline-none ${selected
                ? selected?.length > 25
                  ? selected?.substring(0, 25) + "..."
                  : selected
                : "Select Country"}`}
          /> 
           
                  <button
                    className="px-2
                  shadow-red-300 shadow-md
                  text-white bg-red-700 border-l rounded "
                  >
                    <SearchOutlined />
                  </button>
                  </div>
                  {search?.map((s:any) => (
          <li
            key={s?.productName}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              s?.productName?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              s?.productName?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (s?.productName?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(s?.productName);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {s?.productName}
          </li>
        ))}
      </ul>
               
               
    </div>
  )
}

export default ProductSearch