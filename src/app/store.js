import {configureStore} from "@reduxjs/toolkit"
import pageReducer from "./pageSlice"

//store digunakan untuk menampung semua slice redux
const store = configureStore({
    reducer:{
        page:pageReducer
    },
})
export default store