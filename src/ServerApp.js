import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import { Provider } from "react-redux";
import store from "./store";
import fs from "fs";
import App from "./App";

const html = fs.readFileSync("dist/index.html").toString();
const parts = html.split("Not Rendered");


module.exports = (req, res) => {
    res.write(parts[0]);
  
    const reactMarkup = (
      <ServerLocation url={req.url}>
      <Provider store={store}>
        <App />
      </Provider>
      </ServerLocation>
    );
  
    const stream = renderToNodeStream(reactMarkup);
  
    stream.pipe(
      res,
      { end: false }
    );
  
    stream.on("end", () => {
      res.write(parts[1]);
      res.end();
    });
  }