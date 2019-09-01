import React, { useEffect } from "react";

import RecipeListView from "../../components/RecipeListView";

const Pure = ({ recipeList, fetchRecipeList, history, ...rest }) => {
  useEffect(() => {
    fetchRecipeList();
  }, []);

  const onClickRecipeItem = item => {
    history.push(`/recipe?recipeId=${item.sys.id}`);
  };
  return (
    <RecipeListView
      recipeList={recipeList}
      onClickRecipeItem={onClickRecipeItem}
    />
  );
};

export default Pure;
