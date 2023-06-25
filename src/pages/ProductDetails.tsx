import ProductDet from "../components/User/ProductDet";
type Props = {
  role: String;
};
const ProductDetails = (props: Props) => {
  const { role } = props;

  return (
    <div className="">
      <ProductDet role={role} />
    </div>
  );
};

export default ProductDetails;