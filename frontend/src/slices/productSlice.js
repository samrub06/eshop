import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

import { BASE_URL, PRODUCTS_URL } from "../constants"
import { apiSlice } from "./apiSlice"


export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getProdutcs: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5
        })
    })
})


export const {useGetProductsQuery} = productsApiSlice