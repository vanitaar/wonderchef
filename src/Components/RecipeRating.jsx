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

  const handleEditRating = async (newRating) => {
    //toggle remove/add star (max 5stars) // newRating = active star = hovered over/clicked
    let changedRating;
    if (newRating === rating) {
      changedRating = null; //to remove star //idea is to nullify the active star; null=absence of value// couldnt use newRating -1 --> if 1-1 = 0 --> doesnt work in airtable; also not using starIndex idea where map numeric value to stars
    } else {
      changedRating = newRating;
    }
    setRating(changedRating); //update local state

    //HAVE TO PATCH TO AIRTABLE
    try {
      await updateRating(recordID, changedRating);
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
          onClick={() => handleEditRating(i)}
        >
          ⭐
        </span>
      );
    }
    return (
      <>
        {minRating === 0 && (
          <span
            onClick={() => handleEditRating(1)}
            style={{ cursor: "pointer", marginLeft: "5px", fontWeight: "bold" }} // inline styling for add rating option
          >
            + Add Star
          </span>
        )}
        {stars}
      </>
    );
  };
  return <>{renderStars()}</>;
}
