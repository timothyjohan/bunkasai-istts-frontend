import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    page:0,
    previous:0
}

export const pageSlice = createSlice({
    name:"page",
    initialState,
    reducers:{
        changePage : (state, action) => {
            state.previous = state.page
            state.page = action.payload
        }
    }
})

export const {changePage} = pageSlice.actions

export default pageSlice.reducer