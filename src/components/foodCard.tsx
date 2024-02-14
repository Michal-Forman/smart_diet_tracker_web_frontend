// Librairies imports
import axios from "axios";

// Custom imports
import bin from "../assets/IMG/bin.png";
import edit from "../assets/IMG/edit.png";
import getBackendUrl from "../functions/getBackendUrl";

function foodCard({ name, calories, protein, carbs, fat, id, onDelete }: any) {
  const handleDelete = async () => {
    const userResponse = confirm(
      "You are now about to delete this food. This action cannot be undone!",
    );
    if (userResponse) {
      const suffix = `food/${id}`;
      const backendUrl = getBackendUrl(suffix);
      console.log(backendUrl);
      try {
        const response = await axios.delete(backendUrl, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("success", response);
        onDelete();
      } catch (error: any) {
        alert("Failed to delete food");
        console.log("Failed to delete food", error);
      }
    }
  };

  return (
    <>
      <div className="new-food-card food-card">
        <div className="food-card--upper-section-container">
          <div onClick={handleDelete}>
            <img className="food-card--delete-img" src={bin} alt="Delete" />
          </div>
          <h2>{name}</h2>
          <div>
            <img className="food-card--edit-img" src={edit} alt="Edit" />
          </div>
        </div>
        <div className="new-food-card--macros-container">
          <div className="new-food-card--macros">
            <h3>Calories</h3>
            <p>{calories} kcal</p>
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
    </>
  );
}

export default foodCard;
