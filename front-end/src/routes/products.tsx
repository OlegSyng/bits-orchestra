import { useQuery } from "react-query"
import { Spinner } from "@/components/Spinner";
import { sleep } from "@/utils/sleep";
import { apiUrl } from "@/utils/apiUrl";
import { ProductList } from "@/pages/ProductList";
import { useProdEnv } from "@/hooks/useProdEnv";
import { products as mockedProducts } from '../../mock-tool/products'
import { type Product } from "@/types";

export const ProductsRoot = () => {
    const isProd = useProdEnv()
    const { data, status, error } = useQuery<unknown, Error, Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
          try {
            await sleep(2000);
            if(isProd) {
              return mockedProducts
            }
            const response = await fetch(apiUrl("products"));
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const products: Product[] = await response.json();
            return products
          } catch (error) {
            if (typeof error === "string") {
              throw new Error(error)
            } else if (error instanceof Error) {
                throw new Error(error.message)
            }
          }
        },
      });

    
      if (status === "loading") {
        return <div className="flex justify-center mt-12"><Spinner /></div>;
      }
    
      if (status === "error" || !data) {
        return (
          <span>Error: {error?.message || "Oops! There was an error while trying to load products"}</span>
        );
      }

      return <ProductList products={data} />
}