import express from "express";

import serverRender from './views/ServerApp';

const PORT = process.env.PORT || 3000;
const app = express();
app.disable('x-powered-by');
app.use("/dist", express.static("dist"));
app.use(serverRender);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  process.send ? process.send("ready") : f => f;
});

process.on("message", function(msg) {
  if (msg == "shutdown") {
    console.log("Closing all connections...");
    setTimeout(function() {
      console.log("Finished closing connections");
      process.exit(0);
    }, 1500);
  }
});
