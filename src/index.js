import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import LiveMatches from "./pages/LiveMatches/index";
import { ThemeProvider } from "styled-components";
import { store, persistor } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={{}}>
          <Router>
            <Route path="/" component={LiveMatches} />
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
