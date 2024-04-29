import { useState } from "react";

export default function RecipeRating({ initialRating }) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(null);

  const handleMouseEnter = (newHoverRating) => {
    setHoverRating(newHoverRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const renderStars = () => {
    const stars = [];
    const minRating = initialRating || 0;

    for (let i = 1; i <= minRating; i++) {
      stars.push(
        <span
          key={i}
          className={
            i <= (hoverRating || rating) ? "active" : "" // Apply "active" class based on hover or current rating
          }
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        >
          ⭐
        </span>
      );
    }
    return stars;
  };
  return <>{renderStars()}</>;
}
