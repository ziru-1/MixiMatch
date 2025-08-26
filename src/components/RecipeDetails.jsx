import React from "react";

const RecipeDetails = ({ recipeDetails }) => {
  return (
    <div>
      <h2>{recipeDetails.title}</h2>
      <img src={recipeDetails.image} alt={recipeDetails.title} />

      {/* ready in minutes and servings */}
      {recipeDetails.readyInMinutes && (
        <p>
          <strong>Ready in:</strong> {recipeDetails.readyInMinutes} minutes
        </p>
      )}
      {recipeDetails.servings && (
        <p>
          <strong>Servings:</strong> {recipeDetails.servings}
        </p>
      )}

      {/* nutrition info */}
      {recipeDetails.nutrition && (
        <div>
          <h3>Nutrition Per Serving:</h3>
          <ul>
            {recipeDetails.nutrition.nutrients.slice(0, 5).map((nutrient) => (
              <li key={nutrient.name}>
                {nutrient.name}: {Math.round(nutrient.amount)} {nutrient.unit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* recipe instructions */}
      {recipeDetails.analyzedInstructions &&
        recipeDetails.analyzedInstructions.length > 0 && (
          <div>
            <h3>Instructions:</h3>
            <ol>
              {recipeDetails.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          </div>
        )}

      {/* recipe ingredients*/}
      {recipeDetails.extendedIngredients &&
        recipeDetails.extendedIngredients.length > 0 && (
          <div>
            <h3>Ingredients:</h3>
            <ul>
              {recipeDetails.extendedIngredients.map((ing) => (
                <li key={ing.id}>{ing.original}</li>
              ))}
            </ul>
          </div>
        )}

      {/* recipe source url*/}
      {recipeDetails.sourceUrl && (
        <p>
          <a
            href={recipeDetails.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View full recipe source
          </a>
        </p>
      )}
    </div>
  );
};

export default RecipeDetails;
