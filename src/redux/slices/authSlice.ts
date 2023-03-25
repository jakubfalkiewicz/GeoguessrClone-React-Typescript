import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import IUser from "../../interfaces/IUser";


export interface AuthState {
  status: 'idle' | 'loading' | 'failed';
  user: IUser;
  error: null | string;
}

const initialState: AuthState = {
  status: 'idle',
  user: {
  } as IUser,
  error: null,
};

interface LoginInterface {
    email: string,
    password: string,
}

export const loginUser = createAsyncThunk(
    'users/fetchByIdStatus',
    async ({email, password}: LoginInterface) => { 
        try{
            const user = await axios.post(`https://mongodb-api.onrender.com/users/login`, { email, password})
            sessionStorage.setItem('user', JSON.stringify(user.data.user))
            return user.data.user
        }
        catch(err){
            return err
        }
    }
);

export const authSlice = createSlice({
    name: 'userHandler',
    initialState,
    reducers: {
        logoutUser: (state) => {
            sessionStorage.removeItem("user")
            state.user = {} as IUser;
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.status = 'idle';
          state.user = action.payload;
          state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.status = 'failed';
          state.user = {} as IUser;
          state.error = action.error.message as string;
        });
    },
});

export const {  logoutUser } = authSlice.actions;

export default authSlice.reducer;