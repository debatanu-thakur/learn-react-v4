import React from "react";
import { hydrate } from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

hydrate(<Provider store={store}><App /> </Provider>, document.getElementById("root"));
