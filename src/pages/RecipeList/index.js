import { connect } from "react-redux";

import Pure from "./Pure";
import { fetchRecipeListAction as fetchRecipeList } from "../../models/recipes";

const mapStateToProps = state => ({
  recipeList: state.recipes.recipeList
});

const mapDispatchToProps = {
  fetchRecipeList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure);
