import { useQuery } from "react-query"
import { Spinner } from "@/components/Spinner";
import { sleep } from "@/utils/sleep";
import { apiUrl } from "@/utils/apiUrl";
import { Reviews } from "@/pages/Reviews";
import { useProdEnv } from "@/hooks/useProdEnv";
import { reviews as mockedReviews } from "../../mock-tool/reviews";
import { type Review } from "@/types";

export const ReviewsRoot = () => {
    const isProd = useProdEnv()
    const { data, error, status } = useQuery<unknown, Error, Review[]>({
        queryKey: ["reviews"],
        queryFn: async () => {
          try {
            await sleep(2000);
            if(isProd) {
              return mockedReviews // Use in prod mockedReviews
            }
            const response = await fetch(apiUrl("reviews"));
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const reviews: Review[] = await response.json()
            return reviews
          } catch (error) {
            if (typeof error === "string") {
              throw new Error(error)
            } else if (error instanceof Error) {
                throw new Error(error.message)
            }
          }
        },
      });
 
      if (status === 'loading') {
        return <div className="flex justify-center mt-12"><Spinner /></div>;
      }
    
      if (status === 'error' || !data) {
        return (
          <span>Error: {error?.message || "Oops! There was an error while trying to load products"}</span>
        );
      }

      return <Reviews reviewsData={data} />
}