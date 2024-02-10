// Library imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Custom imports
import userLogo from "../assets/IMG/user.png";
import hamburgerMenu from "../assets/IMG/hamburgerMenu.png";
import sendArrow from "../assets/IMG/sendArrow.png";
import NutrientCard from "../components/nutrientCard";

function Home() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [totals, setTotals] = useState({
    calories: null,
    protein: null,
    carbs: null,
    fat: null,
  });

  const writeFoodData = async () => {
    let backendUrl;
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "192.168.2.173"
    ) {
      // When developing
      backendUrl = "http://192.168.2.173:3000/api/smart-diet-tracker/food";
    } else {
      // When in production
      backendUrl =
        "https://main-api-0xrx.onrender.com/api/smart-diet-tracker/food";
    }
    const response = await axios.get(backendUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log("response:", response.data.totals);
    setTotals(response.data.totals);
    console.log("totals:", totals);
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

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let backendUrl;
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "192.168.2.173"
    ) {
      // When developing
      backendUrl = "http://192.168.2.173:3000/api/smart-diet-tracker/food";
    } else {
      // When in production
      backendUrl =
        "https://main-api-0xrx.onrender.com/api/smart-diet-tracker/food";
    }

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
    } catch (error: any) {
      console.log("Food logging failed", error);
      alert(error.response.data);
    }
  };

  return (
    <>
      <div className="background">
        {/* Navbar */}
        <div className="top-bar">
          <a>
            <img className="icon" src={hamburgerMenu} />
          </a>
          <a>
            <img className="icon" src={userLogo} />
          </a>
        </div>
        <div id="home--cards-container">
          {/* Cards */}
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
