import { useState, useContext } from "react";
import { recipeEditContext } from "../../hooks/providers/recipeEditMode";

import useApplicationData from "../../hooks/useApplicationData";

import IngredientForm from "./IngredientForm";

const EditRecipeIngredients = function(props) {
  const { createIngredient } = useApplicationData();
  const {
    currentRecipe,
    currentIngredients,
    setIngredients,
    recipeSummaryView,
    recipeIngredientsView,
    recipeDirectionsView,
  } = useContext(recipeEditContext);

  const addIngredient = function() {
    console.log('🍍ADD INGREDIENT🍍');
    const newIngredient = {
      recipe_id: currentRecipe.id,
      name: "",
      quantity: 0,
      units: ""
    };
    console.log('🦑', newIngredient);
    createIngredient(newIngredient);
    setIngredients([...currentIngredients, newIngredient]);
  };

  console.log(currentIngredients);

  return (
    <>
      <h1>Edit Recipe Ingredients</h1>
      <ul>
        {currentIngredients && currentIngredients.map(ingredient => {
          return (
            <li key={`ingredient${ingredient.id}`}>
              <IngredientForm ingredient={ingredient} />
            </li>
          );
        })}
      </ul>
      <button onClick={addIngredient}>+ Add Ingredient +</button>
      <button onClick={recipeSummaryView}>Back</button>
      <button onClick={recipeDirectionsView}>Next</button>
    </>
  );
};

export default EditRecipeIngredients;