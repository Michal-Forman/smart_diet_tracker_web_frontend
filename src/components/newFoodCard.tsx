function newFoodCard({ name, calories, protein, carbs, fat, opacity }: any) {
  return (
    <div className={`new-food-card ${opacity}`}>
      <h2>{name}</h2>
      <div className="new-food-card--macros-container">
        <div className="new-food-card--macros">
          <h3>Calories</h3>
          <p>{calories} Kcal</p>
        </div>
        <div className="new-food-card--macros">
          <h3>Protein</h3>
          <p>{protein} g</p>
        </div>
        <div className="new-food-card--macros">
          <h3>Carbs</h3>
          <p>{carbs} g</p>
        </div>
        <div className="new-food-card--macros">
          <h3>Fat</h3>
          <p>{fat} g</p>
        </div>
      </div>
    </div>
  );
}

export default newFoodCard;
