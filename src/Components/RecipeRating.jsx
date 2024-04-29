import { useContext, useState } from "react";
import { AirtableContext } from "../AirtableContext";

export default function RecipeRating({ initialRating, recordID }) {
  const { updateRating } = useContext(AirtableContext);
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(null);

  const handleMouseEnter = (newHoverRating) => {
    setHoverRating(newHoverRating);
    console.log("enter:", hoverRating); //-->null
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
    console.log("leave:", hoverRating); //-->starIndex
  };

  const handleAddRating = async (newRating) => {
    console.log(newRating);
    setRating(newRating); //local state updated
    console.log("add rating");
    console.log(rating);
    //HAVE TO PATCH TO AIRTABLE
    try {
      await updateRating(recordID, newRating);
      console.log("Rating updated successfully in Airtable");
    } catch (error) {
      console.error("Error updating rating in Airtable:", error);
    }
  };

  const renderStars = () => {
    const stars = [];
    const minRating = initialRating || 0;

    for (let i = 1; i <= minRating; i++) {
      stars.push(
        <span
          style={{
            cursor: "pointer",
            textShadow: i === hoverRating ? "0 0 8px gold" : "none",
          }}
          key={i}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleAddRating(i)}
        >
          ⭐
        </span>
      );
    }
    return (
      <>
        {minRating === 0 && (
          <span
            onClick={() => handleAddRating(1)}
            style={{ cursor: "pointer", marginLeft: "5px", fontWeight: "bold" }} // inline styling for add rating option
          >
            + Add Rating
          </span>
        )}
        {stars}
      </>
    );
  };
  return <>{renderStars()}</>;
}
