import { products } from "constants/products";
import React from "react";
import { Product } from "./Product";

export const Products = () => {
  return (
    <div className="relative z-10">
      {products.map((product, idx) => (
        <Product key={`product-${idx}`} product={product} />
      ))}
    </div>
  );
};
