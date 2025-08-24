import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [ingredientQuery, setIngredientQuery] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [allowOthers, setAllowOthers] = useState(false);

  const handleIngredientQueryChange = (e) => {
    setIngredientQuery(e.target.value);
  };

  useEffect(() => {
    if (!ingredientQuery) {
      setIngredients([]);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      axios
        .get(
          `https://api.spoonacular.com/food/ingredients/autocomplete?query=${ingredientQuery}&metaInformation=true&number=5&apiKey=${
            import.meta.env.VITE_API_KEY
          }`
        )
        .then((response) => {
          setIngredients(response.data);
        });
    }, 250);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [ingredientQuery]);

  const handleIngredientClick = (ingredient) => {
    setCurrentIngredients((prev) => [...prev, ingredient]);
    setIngredientQuery("");
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

    axios
      .get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientNames}&number=10&ranking=2&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => {
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
        onChange={handleIngredientQueryChange}
        type="text"
        placeholder="Search for an ingredient"
      />
      <div>
        {ingredients.map((ingredient) => {
          return (
            <div
              onClick={() => handleIngredientClick(ingredient)}
              key={ingredient.id}
            >
              {ingredient.name}
            </div>
          );
        })}
      </div>
      <div>
        <h2>Current Ingredients:</h2>
        <ul>
          {currentIngredients.map((ingredient) => {
            return <li key={ingredient.id}>{ingredient.name}</li>;
          })}
        </ul>
        <label>
          <input
            type="checkbox"
            checked={allowOthers}
            onChange={handleCheckboxChange}
          />
          Allow other ingredients
        </label>
        <button onClick={handleSearchRecipe}>Search Recipes</button>
      </div>
      <div>
        <h2>Recipes</h2>
        {recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
              <p>Used Ingredients: {recipe.usedIngredientCount}</p>
              <p>Missed Ingredients: {recipe.missedIngredientCount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
