import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const el = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(el!);

root.render(<App />);
