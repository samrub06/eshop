import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/bootstrap.custom.css"
import "./assets/styles/index.css"
import App from "./App";
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from "react-router-dom"
import Homescreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import store from "./store.js";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<Homescreen />}/>
            <Route  path="/:product/:id" element={<ProductScreen />}/>
        </Route>

    )
)

const el = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(el!);

root.render(<Provider store={store}><RouterProvider router={router} /></Provider> );
