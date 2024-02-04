import { FC } from "react";
import { cn } from "../utils/cn";
import { useProductAvalability } from "../hooks/useProductAvalability";
import { useHoverListener } from "../hooks/useHoverListener";
import { type Product } from "../types";

type ProductItemProps =  Omit<Product, "id">;

export const ProductItem: FC<ProductItemProps> = ({
    productName,
    imageUrls,
    price,
    currencyCode,
    distributor: { city, distributorName, streetName, streetNumber },
    avaliableFrom,
}) => {
  const [isAvaliable, localAvalabilityDate] = useProductAvalability(avaliableFrom);
  const [targetRef, isHovered] = useHoverListener<HTMLLIElement>();

  return (
    <li ref={targetRef} className={cn("w-96 relative flex-none p-5 hover:cursor-pointer", isHovered && 'shadow')}>

      <a href="#" className={cn("absolute transition-opacity opacity-0 w-40 z-10 text-center bg-teal-700 text-white py-2 hover:shadow-lg", isHovered && 'opacity-100')}>
        Shop By Room
      </a>

      <button className="absolute right-5 z-10 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={32} width={32}>
            <path fill="#fff" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
        </svg>
      </button>

      <div className="relative">
        <img className="object-cover w-full h-80" src={isHovered ? imageUrls?.product : imageUrls?.interior} alt="Product Image" />
        <a href="#" className={cn("absolute transition-opacity opacity-0 text-2xl bottom-2 left-2 border-b-2 border-solid text-white", isHovered && 'opacity-100')}>Product Details</a>
      </div>

      <div className="flex flex-wrap justify-between py-2">
        <p className="w-2/3 truncate text-xl font-semibold">{productName}</p>
        <div className="w-1/3 text-xl text-right font-semibold">
          {price || "--"}
          <span>&nbsp;{currencyCode}</span>
        </div>
        <p className="w-full truncate text-md mb-1">{distributorName}</p>
        <div className="w-56 flex items-center gap-2 text-sm">
            <span className="w-3 h-3 relative flex shrink-0">
                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75", isAvaliable && 'bg-green-400')}></span>
                <span className={cn("relative inline-flex rounded-full h-3 w-3 bg-red-400", isAvaliable && 'bg-green-400')}></span>
            </span>
            <p className="truncate">
                {isAvaliable
                ? `Avaliable Now ${city}, ${streetName} ${streetNumber}`
                : `Avaliable From ${localAvalabilityDate}`}
            </p>
        </div>
        <div className="flex justify-end gap-1 text-sm">
            <label>Compare</label>
            <input type="checkbox" className="w-5 h-5 rounded-none" />
        </div>
      </div>
    </li>
  );
};
