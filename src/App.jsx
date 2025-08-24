import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [ingredientQuery, setIngredientQuery] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([]);

  const handleIngredientQueryChange = (e) => {
    setIngredientQuery(e.target.value);
  };

  useEffect(() => {
    if (!ingredientQuery) return;

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

  return (
    <div>
      <input
        value={ingredientQuery}
        onChange={handleIngredientQueryChange}
        type="text"
      />
      <div>
        {ingredients.map((ingredient) => {
          return <div key={ingredient.id}>{ingredient.name}</div>;
        })}
      </div>
    </div>
  );
};

export default App;
