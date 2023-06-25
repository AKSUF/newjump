import React from 'react';
import AvailableProducts from '../For all users/AvailableProducts';
import AvailableGrocery from '../For all users/AvailableGrocery';
import ImageSlider from './ImageSlider';
import Pic from "../../assets/public/home.jpg";
import AvailableFruit from '../For all users/AvailableFruit';


type Props = {
  role: string;
};

type Slide = {
  id: number;
  imageUrl: string;
};

type ImageSliderProps = {
  slides: Slide[];
};

const UserHome = (props: Props) => {
  const { role } = props;
  const images = [
    { id: 1, imageUrl: "https://cdn.pixabay.com/photo/2016/04/21/11/48/orange-1343157__340.png",description:"gdddddddddddddddddddddd" },
    { id: 2, imageUrl: "https://img.freepik.com/premium-photo/fashion-outlet-website-tablet_746318-4360.jpg" ,
    description:"rrrrrrrrrrrrrrrrrrrrr"},
    { id: 3, imageUrl: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpgg" 
    ,description:"eeeeeeeeeeeeeeeeeeeeeeee"},
  ];

  return (
    <div>
      {/* <ImageSlider slides={images} /> */}
      <AvailableProducts role={role} />
      <AvailableGrocery role={role}/>
      <AvailableFruit role={role} />
    </div>
  );
};

export default UserHome;