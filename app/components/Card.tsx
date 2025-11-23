import { Show } from "../types/index.ts"
import MovieRating from "./MovieRating"
import Image from "next/image"

const Card = ({name, rating, image}: Show) => {
  return (
    <div className="bg-white w-[250px] min-w-[250px] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 shrink-0">
        <Image 
          src={image?.original || ''} 
          alt={name || 'No image available'} 
          className="w-full h-80 min-h-80 object-cover"
          width={250}
          height={250}
        />
        <div className="p-4">
            <h2 className="text-xl text-gray-800 mb-2 truncate">{name}</h2>
            {rating?.average && <MovieRating rating={(rating?.average*10) || 0} />}
        </div>
    </div>
  )
}

export default Card