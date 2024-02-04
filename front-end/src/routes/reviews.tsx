import { useQuery } from "react-query"
import { Spinner } from "@/components/Spinner";
import { sleep } from "@/utils/sleep";
import { apiUrl } from "@/utils/apiUrl";
import { Reviews } from "@/pages/Reviews";
import { reviews as mockedReviews } from "../../mock-tool/reviews";
import { useProdEnv } from "@/hooks/useProdEnv";
import { type Review } from "@/types";

export const ReviewsRoot = () => {
    const { data, status, error } = useQuery<unknown, Error, Review[]>({
        queryKey: ["reviews"],
        queryFn: async () => {
          await sleep(2000);
          const response = await fetch(apiUrl("reviews"));
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

      return <Reviews reviewsData={isProd ? mockedReviews : data} />
}