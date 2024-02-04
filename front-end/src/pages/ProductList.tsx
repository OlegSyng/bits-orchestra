import { useQuery } from "react-query";
import { apiUrl } from "../utils/apiUrl";
import { Product } from "../types";
import { ProductItem } from "../components/ProductItem";
import { Header } from "../components/Header";

export const ProductList = () => {
  const { data, status, error } = useQuery<unknown, Error, Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(apiUrl("products"));
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error" || !data) {
    return (
      <span>Error: {error?.message || "Oops! There was an error while trying to load products"}</span>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto min-w-0">
        <Header />
        <ul className="flex py-6 overflow-x-auto">
        {data.map((p) => (
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
