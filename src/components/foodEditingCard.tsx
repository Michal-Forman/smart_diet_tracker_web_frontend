// Library imports
import { useState } from "react";
import axios from "axios";

// Custom imports
import getBackendUrl from "../functions/getBackendUrl";

function foodEditingCard({
  name,
  calories,
  protein,
  carbs,
  fat,
  id,
  onCancel,
  onSubmit,
}: any) {
  const [newName, setNewName] = useState(name);
  const [newCalories, setNewCalories] = useState(calories);
  const [newProtein, setNewProtein] = useState(protein);
  const [newCarbs, setNewCarbs] = useState(carbs);
  const [newFat, setNewFat] = useState(fat);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submit");
    const foodItem = {
      name: newName,
      calories: newCalories,
      protein: newProtein,
      carbs: newCarbs,
      fat: newFat,
    };

    try {
      const suffix = `food/${id}`;
      const backendUrl = getBackendUrl(suffix);
      const response = await axios.put(backendUrl, foodItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response);
      onSubmit();
      onCancel();
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  return (
    <>
      <form className="food-editing-card" onSubmit={handleSubmit}>
        <h3>Name</h3>
        <input
          type="text"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <div className="new-food-card--upper-macros-row">
          <div className="new-food-card--macros">
            <h3>Calories</h3>
            <div className="new-food-card--input-suffix-conainer">
              <input
                type="number"
                value={newCalories}
                onChange={(event) => setNewCalories(event.target.value)}
              />
              <p>kcal</p>
            </div>
          </div>

          <div className="new-food-card--macros">
            <h3>Protein</h3>
            <div className="new-food-card--input-suffix-conainer">
              <input
                type="number"
                value={newProtein}
                onChange={(event) => setNewProtein(event.target.value)}
              />
              <p>g</p>
            </div>
          </div>
        </div>
        <div className="new-food-card--bottom-macros-row">
          <div className="new-food-card--macros">
            <h3>Carbs</h3>
            <div className="new-food-card--input-suffix-conainer">
              <input
                type="number"
                value={newCarbs}
                onChange={(event) => setNewCarbs(event.target.value)}
              />
              <p>g</p>
            </div>
          </div>
          <div className="new-food-card--macros">
            <h3>Fat</h3>
            <div className="new-food-card--input-suffix-conainer">
              <input
                type="number"
                value={newFat}
                onChange={(event) => setNewFat(event.target.value)}
              />
              <p>g</p>
            </div>
          </div>
        </div>
        <div className="new-food-card--buttons-container">
          <button
            className="food-editing-card--cancel-button"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="food-editing-card--submit-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default foodEditingCard;
