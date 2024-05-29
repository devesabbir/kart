import { renderRatingStars } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StarsReviews({ ratings, reviewsNumber }) {
  const stars = renderRatingStars(ratings);
  return (
    <div className="flex items-center">
      <div className="flex gap-1 text-sm text-yellow-400">
        {stars?.map((star, i) => (
          <span key={star + i}>
            <FontAwesomeIcon icon={star} />
          </span>
        ))}
      </div>
      <div className="text-xs text-gray-500 ml-3">({reviewsNumber})</div>
    </div>
  );
}

export default StarsReviews;
