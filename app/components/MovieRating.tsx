import { GoStarFill } from "react-icons/go";

const MovieRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      <GoStarFill aria-hidden="true" className="text-yellow-400 text-lg" />
      <span className="font-medium text-white">{(rating/10).toFixed(1)}</span>
    </div>
  );
};

export default MovieRating;
