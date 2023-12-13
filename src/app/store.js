// Mengimpor fungsi configureStore dari pustaka redux toolkit
import { configureStore } from "@reduxjs/toolkit";

// Mengimpor pageReducer dari file pageSlice
import pageReducer from "./pageSlice";

// Store digunakan untuk menampung semua slice redux
// Dalam hal ini, kita hanya memiliki satu slice yaitu 'page'
// yang diatur oleh pageReducer
const store = configureStore({
    reducer: {
        page: pageReducer,
    },
});

// Eksport default store sehingga dapat digunakan di file lain
export default store;
