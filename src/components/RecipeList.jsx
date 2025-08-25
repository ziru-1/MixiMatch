import React from 'react'

const RecipeList = ({recipes}) => {
  return (
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
  )
}

export default RecipeList