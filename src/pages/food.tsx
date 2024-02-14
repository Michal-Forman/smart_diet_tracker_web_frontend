// Librairies imports
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Custom imports
import getBackendUrl from "../functions/getBackendUrl";
import Navbar from "../components/navBar";
import FoodCard from "../components/foodCard";
import FoodDevider from "../components/foodDevider";

function Food() {
  const navigate = useNavigate();

  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    getAllFood();
  }, []);

  const getAllFood = async () => {
    const backendUrl = getBackendUrl("food");
    try {
      const response = await axios.get(backendUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const foodData = processFoodData(response.data.foodItems);
      // @ts-ignore
      setFoodData(foodData);
    } catch (error: any) {
      console.log("Failed to fetch food data", error);
      navigate("/login");
    }
  };

  const processFoodData = (foodData: any) => {
    const correctDateFoodData = foodData.map((foodItem: any) => {
      const processedFoodItem = {
        _id: foodItem._id,
        name: foodItem.name,
        calories: foodItem.calories,
        protein: foodItem.protein,
        carbs: foodItem.carbs,
        fat: foodItem.fat,
        time: formatDate(foodItem.time),
      };
      return processedFoodItem;
    });
    const processedFoodData = groupByDate(correctDateFoodData);
    return processedFoodData;
  };

  const groupByDate = (foodData: any) => {
    const groups: any = {};

    foodData.forEach((foodItem: any) => {
      if (!groups[foodItem.time]) {
        groups[foodItem.time] = [];
      }
      groups[foodItem.time].push(foodItem);
    });

    // convert the groups object to an array of objects
    const groupedFoodData = Object.keys(groups).map((date) => {
      return {
        date,
        foodItems: groups[date],
      };
    });
    // Sort the array by date
    groupedFoodData.sort((a, b) => b.date.localeCompare(a.date));

    return groupedFoodData;
  };

  const formatDate = (dateString: string) => {
    // Convert the date string to a date object in correct format
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getRelativeFoodLabel = (date: string) => {
    // Get today's date in correct format
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
    const todayDay = today.getDate().toString().padStart(2, "0");
    const todayString = `${todayYear}-${todayMonth}-${todayDay}`;

    // Get yesterday's date in correct format
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayYear = yesterday.getFullYear();
    const yesterdayMonth = (yesterday.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const yesterdayDay = yesterday.getDate().toString().padStart(2, "0");
    const yesterdayString = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}`;

    // Compare the date to today's date
    if (date === todayString) {
      return "Today";
    } else if (date === yesterdayString) {
      return date;
    }
  };

  return (
    <>
      <div className="background">
        <Navbar title="food" />
        <div className="food-card--container">
          {foodData.map((group: any) => {
            return (
              <div key={group.date}>
                <FoodDevider time={group.date} />
                {group.foodItems.map((foodItem: any) => {
                  return (
                    <FoodCard
                      key={foodItem._id}
                      id={foodItem._id}
                      name={foodItem.name}
                      calories={foodItem.calories}
                      protein={foodItem.protein}
                      carbs={foodItem.carbs}
                      fat={foodItem.fat}
                      onDelete={getAllFood}
                    />
                  );
                })}
              </div>
            );
          })}
          ;
        </div>
      </div>
    </>
  );
}

export default Food;
