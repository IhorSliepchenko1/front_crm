import { createSlice } from "@reduxjs/toolkit"
import { userApi } from "../../app/services/userApi"
import { RootState } from "../../app/store"

interface InitialState {
     isAuthenticated: boolean
     token: string | null
}

const initialState: InitialState = {
     isAuthenticated: false,
     token: null,
}

const slice = createSlice({
     name: `user`,
     initialState,
     reducers: {
          logout: (state) => {
               state.isAuthenticated = false
               state.token = null
               localStorage.removeItem(`token`)
          }

     },

     extraReducers: (builder) => {
          builder
               .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
                    state.token = action.payload.token
                    state.isAuthenticated = true
               })
               .addMatcher(userApi.endpoints.check.matchFulfilled, (state, action) => {
                    state.token = action.payload.token
                    state.isAuthenticated = true
               })

     },
})

export const { logout } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
