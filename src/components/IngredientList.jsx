import React from 'react'

const IngredientList = ({ingredients, onIngredientClick}) => {
  return (
    <div>
        {ingredients.map((ingredient) => {
          return (
            <div
              onClick={() => onIngredientClick(ingredient)}
              key={ingredient.id}
            >
              {ingredient.name}
            </div>
          );
        })}
      </div>
  )
}

export default IngredientList