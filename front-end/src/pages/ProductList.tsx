import { FC } from "react";
import { ProductItem } from "../components/ProductItem";
import { Header } from "../components/Header";
import { type Product } from "../types";

export const ProductList: FC<Record<'products', Product[]>> = ({products}) => {
  return (
    <div className="max-w-screen-xl mx-auto min-w-0">
        <Header />
        <ul className="flex py-6 overflow-x-auto">
        {products.map((p) => (
            <ProductItem
            key={p.id}
            productName={p.productName}
            imageUrls={p.imageUrls}
            price={p.price}
            currencyCode={p.currencyCode}
            avaliableFrom={p.avaliableFrom}
            distributor={p.distributor}
            />
        ))}
        </ul>
    </div>
  );
};
