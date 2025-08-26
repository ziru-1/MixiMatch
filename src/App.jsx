import React from "react";
import { useState, useEffect } from "react";
import {
  fetchIngredientSuggestions,
  fetchRecipesByIngredients,
  fetchRecipeDetails
} from "./api/spoonacular";
import IngredientList from "./components/IngredientList";
import CurrentIngredients from "./components/CurrentIngredients";
import RecipeList from "./components/RecipeList";
import RecipeControls from "./components/RecipeControls";
import RecipeDetails from "./components/RecipeDetails";

const App = () => {
  const [ingredientQuery, setIngredientQuery] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [allowOthers, setAllowOthers] = useState(false);

  useEffect(() => {
    if (!ingredientQuery) {
      setIngredients([]);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      fetchIngredientSuggestions(ingredientQuery).then((data) => {
        setIngredients(data);
      });
    }, 250);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [ingredientQuery]);

  const handleIngredientClick = (ingredient) => {
    if (currentIngredients.find((ing) => ing.id === ingredient.id)) {
      alert("Ingredient already added.");
      return;
    }

    setCurrentIngredients((prev) => [...prev, ingredient]);
    setIngredientQuery("");
  };

  const handleRecipeClick = (recipeId) => {
    console.log(recipeId);
    fetchRecipeDetails(recipeId).then((data) => {
      setRecipeDetails(data);
    });
  }

  const handleResetIngredients = () => {
    setCurrentIngredients([]);
    setRecipes([]);
  };

  const handleRemoveIngredient = (ingredientId) => {
    setCurrentIngredients((prev) =>
      prev.filter((ing) => ing.id !== ingredientId)
    );
  };

  const handleCheckboxChange = () => {
    setAllowOthers((prev) => !prev);
  };

  const handleSearchRecipe = () => {
    if (currentIngredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }

    const ingredientNames = currentIngredients
      .map((ingredient) => ingredient.name)
      .join(",");

    fetchRecipesByIngredients(ingredientNames).then((response) => {
      if (allowOthers) {
        return setRecipes(response.data);
      }

      // Recipes with no additional ingredients
      const recipeFilter = response.data.filter(
        (recipe) => recipe.missedIngredientCount === 0
      );
      setRecipes(recipeFilter);
    });
  };

  return (
    <div>
      <input
        value={ingredientQuery}
        onChange={(e) => setIngredientQuery(e.target.value)}
        type="text"
        placeholder="Search for an ingredient"
      />
      <IngredientList
        ingredients={ingredients}
        onIngredientClick={handleIngredientClick}
      />
      <CurrentIngredients
        currentIngredients={currentIngredients}
        onRemoveIngredient={handleRemoveIngredient}
      />
      <RecipeControls
        allowOthers={allowOthers}
        onCheckboxChange={handleCheckboxChange}
        onSearchRecipe={handleSearchRecipe}
        onResetIngredients={handleResetIngredients}
      />
      <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick}/>
      {recipeDetails && (
        <RecipeDetails recipeDetails={recipeDetails} />
      )}
    </div>
  );
};

export default App;
