import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";

import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   // <Provider store={store}>
//   //   <Router>
//   <App />
// );
