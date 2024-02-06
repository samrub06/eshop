import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/bootstrap.custom.css"
import "./assets/styles/index.css"
import App from "./App";

const el = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(el!);

root.render(<App />);
