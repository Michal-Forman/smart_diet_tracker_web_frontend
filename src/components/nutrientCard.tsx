function NutrientCard({ usersIntake, name }: any) {
  return (
    <div className="nutrient-card">
      <h2 className="nutrient-name">{name}</h2>
      <div className="fractionHolder">
        <h3 className="nominator nutrient-description">{usersIntake}</h3>
        <h3 className="nutrient-description">/</h3>
        <h3 className="dominator nutrient-description">Goal</h3>
      </div>
    </div>
  );
}

export default NutrientCard;
