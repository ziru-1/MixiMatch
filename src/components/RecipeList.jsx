import React from "react";

const Recipe = ({ recipe, onRecipeClick }) => {
  return (
    <div key={recipe.id} onClick={() => onRecipeClick(recipe.id)}>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
      <p>Used Ingredients: {recipe.usedIngredientCount}</p>
      <p>Missed Ingredients: {recipe.missedIngredientCount}</p>
    </div>
  );
};

const RecipeList = ({ recipes, onRecipeClick }) => {
  return (
    <div>
      <h2>Recipes</h2>
      {recipes.map((recipe) => {
        return (
          <Recipe
            key={recipe.id}
            recipe={recipe}
            onRecipeClick={onRecipeClick}
          />
        );
      })}
    </div>
  );
};

export default RecipeList;
