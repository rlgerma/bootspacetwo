import React from "react";
import ReactDOM from "react-dom";
import Application from "./Application";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<Application />, document.getElementById("root"));

serviceWorker.unregister();
