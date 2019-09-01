import React from "react";

import RecipeItem from "./RecipeItem";

const RecipeListView = ({ recipeList = [], onClickRecipeItem }) => {
  return (
    <>
      {recipeList.map(recipe => (
        <RecipeItem recipe={recipe} onClick={onClickRecipeItem} key={recipe.sys.id}/>
      ))}
    </>
  );
};

export default RecipeListView;
