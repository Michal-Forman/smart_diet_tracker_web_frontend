// Library imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Custom imports
import getBackendUrl from "../functions/getBackendUrl";
import userLogo from "../assets/IMG/user.png";
import hamburgerMenu from "../assets/IMG/hamburgerMenu.png";
import sendArrow from "../assets/IMG/sendArrow.png";
import cross from "../assets/IMG/cross.png";
import NutrientCard from "../components/nutrientCard";
import NewFoodCard from "../components/newFoodCard";
import Menu from "../components/menu";
import Navbar from "../components/navBar";

function Home() {
  const navigate = useNavigate();

  const [newFoodData, setNewFoodData] = useState({
    name: "",
    calories: null,
    protein: null,
    carbs: null,
    fat: null,
  });

  const [cardShouldBeShown, setCardShouldBeShown] = useState(false);
  const [showNewFoodCard, setShowNewFoodCard] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cardAnimation, setCardAnimation] = useState("");
  const [totals, setTotals] = useState({
    calories: null,
    protein: null,
    carbs: null,
    fat: null,
  });

  const writeFoodData = async () => {
    const backendUrl = getBackendUrl("todays-food");
    try {
      const response = await axios.get(backendUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("response:", response);
      setTotals(response.data.totals);
    } catch (error: any) {
      if (error.response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.log("Failed to fetch food data", error);
        alert("Error getting today's food data");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    writeFoodData();
  }, []);

  useEffect(() => {
    if (cardShouldBeShown) {
      setShowNewFoodCard(true);
      setCardAnimation("fade-in");

      const timer = setTimeout(() => {
        setCardAnimation("fade-out");

        setTimeout(() => {
          setCardShouldBeShown(false);
          setShowNewFoodCard(false);
        }, 1000);
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [cardShouldBeShown]);

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const backendUrl = getBackendUrl("food");
    try {
      const response = await axios.post(
        backendUrl,
        { food: inputValue },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      console.log("response:", response);
      setInputValue("");
      console.log("Food logged,", response);
      writeFoodData();
      setCardShouldBeShown(true);
      console.log("correct data", response.data.data);
      setNewFoodData(response.data.data);
      console.log("newFoodData:", newFoodData);
    } catch (error: any) {
      console.log("Food logging failed", error);
      alert("Error logging food");
    }
  };

  return (
    <>
      <div className="background">
        <Navbar title="home" />
        {/* Cards */}
        <div id="home--cards-container">
          {totals ? (
            Object.entries(totals).map(([nutrient, value]) => (
              <NutrientCard
                key={nutrient}
                name={nutrient}
                usersIntake={value}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        {/* New food card */}
        {showNewFoodCard ? (
          <NewFoodCard
            opacity={cardAnimation}
            name={newFoodData.name}
            calories={newFoodData.calories}
            protein={newFoodData.protein}
            carbs={newFoodData.carbs}
            fat={newFoodData.fat}
          />
        ) : (
          <></>
        )}
        <div id="home--food-form-container">
          <form id="home--food-form" onSubmit={handleSubmit}>
            <input
              id="home--food-input"
              type="text"
              value={inputValue}
              onChange={handleChange}
              required={true}
              placeholder="What did you eat?"
            />
            <button id="home--food-submit-button" type="submit">
              <img src={sendArrow} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
