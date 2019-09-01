import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import RecipeList from "./pages/RecipeList/index";
import RecipeView from "./pages/RecipeView/index";
import { ThemeProvider } from "styled-components";
import { store, persistor } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={{}}>
          <Router>
            <Switch>
            <Route path="/recipe" component={RecipeView} />
            <Route path="/" component={RecipeList} />
            </Switch>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
