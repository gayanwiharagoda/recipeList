import React, { useEffect } from "react";
import queryString from "query-string";
import styled from "styled-components";

import SingleRecipeView from "../../components/SingleRecipeView";

const getRecipeById = (recipeList, id) =>
  recipeList.find(recipe => recipe.sys.id === id);

const Pure = ({ recipeList, location }) => {
  const queryParams = queryString.parse(location.search);
  const recipe = getRecipeById(recipeList, queryParams.recipeId);
  return <SingleRecipeView recipe={recipe} />;
};

export default Pure;
