import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

const fetchIngredientSuggestions = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/food/ingredients/autocomplete`,
    {
      params: {
        query,
        metaInformation: true,
        number: 5,
        apiKey: API_KEY,
      },
    }
  );
  return response.data;
};

const fetchRecipesByIngredients = async (ingredientNames) => {
  const response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, {
    params: {
      ingredients: ingredientNames,
      number: 10,
      ranking: 1,
      apiKey: API_KEY,
    },
  });
  return response;
};

const fetchRecipeDetails = async (recipeId) => {
  const response = await axios.get(`${BASE_URL}/recipes/${recipeId}/information`, {
    params: {
      apiKey: API_KEY,
    },
  });
  return response.data;
}

export { fetchIngredientSuggestions, fetchRecipesByIngredients, fetchRecipeDetails };
