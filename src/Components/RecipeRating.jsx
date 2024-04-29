export default function RecipeRating({ rating }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return stars;
  };
  return <>{renderStars()}</>;
}
