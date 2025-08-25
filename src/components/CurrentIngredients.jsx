import React from "react";

const CurrentIngredients = ({currentIngredients, onRemoveIngredient}) => {
  return (
    <div>
      <h2>Current Ingredients:</h2>
      <ul>
        {currentIngredients.map((ingredient) => {
          return (
            <li key={ingredient.id}>
              {ingredient.name}{" "}
              <button onClick={() => onRemoveIngredient(ingredient.id)}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CurrentIngredients;
