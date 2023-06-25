import React from 'react'
import Pic from "../../assets/public/home.jpg";
import "../../styles/home.css";
import AvailableProducts from './AvailableProducts';
import AvailableGrocery from './AvailableGrocery';
import AvailableFruit from './AvailableFruit';
type Props = {
  role: string;
};

const PublicHome = (props: Props) => {
  const { role } = props;
  return (
    <div>
        <div className='banner'>
          <div className="w-full m-0  ">
            
          
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 text-white  justify-items-center">
          
          <div className="mt-14 p-2 text-center">
            <p className="text-orange-400 font-bold uppercase text-2xl pt-3">
              jumpstart
            </p>
            <h1 className="md:text-3xl sm:text-2xl my-2 text-1xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              inventore 
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              inventore recusandae excepturi itaque cumque similique blanditiis,
              qui at voluptatem vel voluptas, voluptate aliquam quidem, commodi
              eveniet dicta aspernatur nulla nam!
            </p>
            <div className="">
              <button className=" bg-red-700 hover:bg-red-900 text-white w-[200px]  text-xl  rounded-md my-6 mx-auto py-3">
                {" "}
                Get Started
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
      <AvailableProducts role={role} />
      <AvailableGrocery role={role} />
      <AvailableFruit role={role} />
    </div>
  )
}

export default PublicHome