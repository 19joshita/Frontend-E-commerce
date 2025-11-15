"use client";

import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const AddToCartClient: React.FC<any> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-6 px-4 py-2 rounded bg-blue-600 text-white"
    >
      Add to cart
    </button>
  );
};

export default AddToCartClient;
