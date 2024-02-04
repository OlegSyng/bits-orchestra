import { useQuery } from "react-query"
import { Spinner } from "@/components/Spinner";
import { sleep } from "@/utils/sleep";
import { apiUrl } from "@/utils/apiUrl";
import { ProductList } from "@/pages/ProductList";
import { products as mockedProducts } from '../../mock-tool/products'
import { type Product } from "@/types";
import { useProdEnv } from "@/hooks/useProdEnv";

export const ProductsRoot = () => {
    const { data, status, error } = useQuery<unknown, Error, Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
          await sleep(2000);
          const response = await fetch(apiUrl("products"));
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      });

      const isProd = useProdEnv()
    
      if (status === "loading") {
        return <div className="flex justify-center mt-12"><Spinner /></div>;
      }
    
      if (status === "error" || !data) {
        return (
          <span>Error: {error?.message || "Oops! There was an error while trying to load products"}</span>
        );
      }

      return <ProductList products={isProd ? mockedProducts : data } />
}