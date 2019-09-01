import { connect } from "react-redux";

import Pure from "./Pure";

const mapStateToProps = state => ({
  recipeList: state.recipes.recipeList
});

export default connect(
  mapStateToProps
)(Pure);
