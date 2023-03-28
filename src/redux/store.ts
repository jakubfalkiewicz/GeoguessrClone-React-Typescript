import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userSliceReducer from './slices/authSlice'
import { useDispatch } from 'react-redux'
import mapsSlice from './slices/mapsSlice'
import storage from "redux-persist/lib/storage"
import  {persistReducer} from "redux-persist"
import gamesSlice from './slices/gamesSlice'

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    userHandler: userSliceReducer,
    mapsReducer: mapsSlice,
    gamesReducer: gamesSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()