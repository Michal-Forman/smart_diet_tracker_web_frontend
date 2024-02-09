function NutrientCard() {
  return (
    <div className="nutrient-card">
      <h2 className="nutrient-name">Calories</h2>
      <div className="fractionHolder">
        <h3 className="nominator nutrient-description">1500</h3>
        <h3 className="nutrient-description">/</h3>
        <h3 className="dominator nutrient-description">2300</h3>
      </div>
    </div>
  );
}

export default NutrientCard;
