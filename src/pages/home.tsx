// Library imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Custom imports
import userLogo from "../assets/IMG/user.png";
import hamburgerMenu from "../assets/IMG/hamburgerMenu.png";
import NutrientCard from "../components/nutrientCard";

const nutrients = [
  {
    name: "Calories",
    numerator: 1500,
    denominator: 2300,
  },
  {
    name: "Protein",
    numerator: 100,
    denominator: 150,
  },
  {
    name: "Carbs",
    numerator: 200,
    denominator: 300,
  },
  {
    name: "Fat",
    numerator: 50,
    denominator: 70,
  },
];

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

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
        <div id="home--cardsContainer">
          {/* Cards */}
          {nutrients.map(() => (
            <NutrientCard />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
