// Mengimpor fungsi createSlice dari pustaka redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Mendefinisikan state awal
const initialState = {
    page: 0, // halaman saat ini
    previous: 0, // halaman sebelumnya
};

// Membuat slice redux dengan nama "page"
export const pageSlice = createSlice({
    name: "page", // nama slice
    initialState, // state awal
    reducers: {
        // daftar reducer
        // Reducer untuk mengubah halaman
        changePage: (state, action) => {
            state.previous = state.page; // menyimpan halaman saat ini sebagai halaman sebelumnya
            state.page = action.payload; // mengubah halaman saat ini ke halaman baru
        },
    },
});

// Mengekspor aksi changePage dari pageSlice
export const { changePage } = pageSlice.actions;

// Mengekspor reducer dari pageSlice
export default pageSlice.reducer;
