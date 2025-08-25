import React from "react";

const RecipeControls = ({
  allowOthers,
  onCheckboxChange,
  onSearchRecipe,
  onResetIngredients,
}) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={allowOthers}
          onChange={onCheckboxChange}
        />
        Allow other ingredients
      </label>
      <button onClick={onSearchRecipe}>Search Recipes</button>
      <button onClick={onResetIngredients}>Reset ingredients</button>
    </div>
  );
};

export default RecipeControls;
