import { useState, type FC } from "react";
import dayjs from "dayjs";
import { ReviewItem } from "@/components/ReviewItem";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewModel } from "@/components/ReviewForm";
import { type Review } from "@/types";

export const Reviews: FC<Record<'reviewsData', Review[]>> = ({reviewsData}) => {
  const [showAll, setShowAll] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(reviewsData)

  const onAddReview = (data: ReviewModel) => {
    const newReview: Review = {
        ...data,
        id: Math.random().toString(),
        rating: Math.floor(Math.random() * 6),
        creationDate: dayjs().format('YYYY-MM-DD')
    }
    setReviews((prev) => [...prev, newReview])
  }

  return (
    <div className="max-w-screen-xl mx-auto min-w-0 bg-slate-100 px-12">
        <div className="overflow-auto min-h-0 max-h-[500px] border-solid border-b-2">
            {reviews.map((r, index) => showAll || !showAll && index === 0 && r ? (
                <ReviewItem
                    key={r.id}
                    author={r.author}
                    rating={r.rating}
                    comment={r.comment}
                    creationDate={r.creationDate}
                />
            ) : null)}
        </div>
        <button className="py-2 my-3 uppercase text-slate-900 underline font-bold" onClick={() => setShowAll((prev) => !prev)}>{showAll ? "Show Less Reviews" : "Read All Reviews"}</button>
        <ReviewForm onSubmit={onAddReview} />
    </div>
  );
};
