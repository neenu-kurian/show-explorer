import { GoStarFill } from "react-icons/go";

const MovieRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      <GoStarFill className="text-yellow-400 text-lg" />
      <span className="font-medium">{(rating/10).toFixed(1)}</span>
    </div>
  );
};

export default MovieRating;
