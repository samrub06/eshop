import {configureStore} from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice"
import cartSlice from "./slices/cartSlice"

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSlice
    },
    middleware: (buildGetDefaultMiddleware)=> buildGetDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store