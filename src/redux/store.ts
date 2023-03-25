import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './slices/authSlice'
import { useDispatch } from 'react-redux'
import mapsSlice from './slices/mapsSlice'

export const store = configureStore({
    reducer: {
        userHandler: userSliceReducer,
        mapsReducer: mapsSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()