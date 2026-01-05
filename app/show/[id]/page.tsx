"use client";
import { useShowDetails } from "../../queries/index.ts";
import MovieRating from "../../components/MovieRating.tsx";
import InfoChip from "../../components/InfoChip.tsx";
import { sanitiseText } from "../../utilities/sanitiseText.ts";
import BackButton from "../../components/BackButton.tsx";
import { useParams } from "next/navigation";
import Image from "next/image";

const MovieDetail = () => {
  const { id } = useParams();
  const { show, error, isLoading } = useShowDetails(id as string);

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p role="status" aria-live="polite" className="text-xl text-red-600">Error loading show details</p>
      </div>
    );
  }
  if (isLoading || !show) {
    return (
      <div className="flex justify-center items-center h-64">
        <p role="status" aria-live="polite" className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }
  return (
    <div className="relative p-5 md:flex gap-6">
      <div className="relative">
        <div className="inline-flex ml-3 items-center gap-2 font-medium my-5 cursor-pointer bg-none border-none p-0 text-base text-black">
          <BackButton />
        </div>
        <div className="relative w-[350px] h-[550px]">
          <Image
            src={show.image?.original || ""}
            alt={show.name}
            priority={true}
            quality={60}
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   33vw"
            className="rounded-xl overflow-hidden shadow-lg mx-left shrink-0"
            fill
          />
        </div>
        <div className="absolute left-4 top-20">
          <MovieRating rating={show?.rating?.average ?? 0} />
        </div>
      </div>
      <div className="flex-1 mt-14">
        <h1 className="text-black text-4xl font-bold mb-3">{show.name}</h1>
        <div className="flex gap-2 mb-4 flex-wrap">
          {show.premiered && (
            <InfoChip
              label="Year"
              value={new Date(show.premiered).getFullYear().toString()}
            />
          )}
          {show.runtime && <InfoChip label="Duration" value={show.runtime} />}
          {show.status && <InfoChip label="Status" value={show.status} />}
        </div>
        {show.genres?.length && (
          <div className="flex gap-2 mb-4 flex-wrap font-bold">
            {show.genres.map((eachGenre, index) => (
              <InfoChip key={index} label={eachGenre}/>
            ))}
          </div>
        )}
        <div className="mb-8 leading-[1.7] text-black">
          {sanitiseText(show.summary)}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
