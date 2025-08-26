import React from 'react'

const RecipeDetails = ({recipeDetails}) => {
  return (
    <div>
          <h2>{recipeDetails.title}</h2>
          <img src={recipeDetails.image} alt={recipeDetails.title} />
          <p>{recipeDetails.instructions}</p>
          <h3>Ingredients:</h3>
          <ul>
            {recipeDetails.extendedIngredients.map((ing) => (
              <li key={ing.id}>{ing.original}</li>
            ))}
          </ul>
        </div>
  )
}

export default RecipeDetails