import { type FC } from "react";
import { cn } from "../utils/cn";
import dayjs from "dayjs";
import { useTruncate } from "../hooks/useTruncate";
import { Review } from "../types";

type ReviewItemProps = Omit<Review, "id">;

export const ReviewItem: FC<ReviewItemProps> = ({
  author: { name },
  rating,
  comment,
  creationDate,
}) => {
  const {targetRef, isTruncated, isShowingMore, toggleIsShowingMore} = useTruncate<HTMLParagraphElement>()
  const starsRating = Array.from({ length: 5 }, (_, index) => {
    if (rating) {
      return index + 1 <= rating ? index + 1 : null;
    }
    return null;
  });

  return (
    <div className="py-4">
      <h3 className="text-xl">{name}</h3>
      <span className="text-md text-slate-500">
        {dayjs(creationDate).format("MMMM D, YYYY")}
      </span>
      <div className="flex items-center -ms-1 my-2 mb-5">
        {starsRating.map((star, i) => (
          <svg
            key={i}
            className={cn("w-4 h-4 ms-1", star && "text-teal-600")}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
      </div>
      <p ref={targetRef} className={cn("break-words mb-2",!isShowingMore && 'line-clamp-2')}>{comment}</p>
      {isTruncated && <button className="uppercase text-slate-900 underline font-bold" onClick={toggleIsShowingMore}>{isShowingMore ? 'Show Less' : 'Read More'}</button>}
    </div>
  );
};
