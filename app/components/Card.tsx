import { Show } from "../types/index.ts";
import MovieRating from "./MovieRating";
import Image from "next/image";
import { BiImage } from "react-icons/bi";

const Card = ({ name, rating, image, index }: Show & { index: number }) => {
  return (
    <div>
      <div className="bg-white relative h-[400px] w-[250px] rounded-lg shadow-lg overflow-hidden shrink-0">
        {image?.original ? (
          <Image
            src={image?.original}
            alt={name || "No image available"}
            fill
            className="object-cover"
            unoptimized
            priority={index < 6}
          />
        ) : (
          <BiImage className="object-cover" size={250} />
        )}
        <div className="absolute top-4 left-4 z-10">
          {rating?.average && (
            <MovieRating rating={rating?.average * 10 || 0} />
          )}
        </div>
      </div>
      <h2 className="text-xl font-bold text-black my-3 truncate max-w-[250px] text-wrap">
        {name}
      </h2>
    </div>
  );
};

export default Card;
