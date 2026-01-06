import { Show } from "../types/index.ts";
import MovieRating from "./MovieRating";
import Image from "next/image";
import { BiImage } from "react-icons/bi";
import { sanitiseText } from "../utilities/sanitiseText.ts";

const Card = ({
  name,
  rating,
  image,
  summary,
  visualIndex,
}: Show & { visualIndex: number }) => {
  return (
    <div className="border-gray-300 border rounded-lg">
      <div className="bg-white h-[400px] w-[250px] rounded-lg shadow-lg overflow-hidden shrink-0">
        {image?.original ? (
          <Image
            src={image?.original}
            alt={name || "No image available"}
            width={250}
            height={400}
            className="object-cover hover:scale-105 transition-transform duration-300 w-full h-full"
            priority={visualIndex < 6}
            quality={75}
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   33vw"
          />
        ) : (
          <BiImage aria-hidden="true" className="object-cover" size={250} />
        )}
        <div className="absolute top-4 left-4 z-10 bg-black/80 py-1 px-2 rounded-md">
          {rating?.average && (
            <MovieRating rating={rating?.average * 10 || 0} />
          )}
        </div>
      </div>
      <h2 className="text-xl font-medium text-gray-900 my-3 truncate max-w-[250px] text-wrap px-2">
        {name}
      </h2>
      <p className="text-gray-600 my-3 truncate max-w-[250px] text-wrap px-2 text-md">
        {sanitiseText(summary)?.slice(0, 100)}...
      </p>
    </div>
  );
};

export default Card;
