import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import IGame from "../../interfaces/IGame";


export interface gamesState {
  status: 'idle' | 'loading' | 'failed';
  games: IGame[];
  error: null | string;
}

const initialState: gamesState = {
  status: 'idle',
  games: [],
  error: null,
};

export const getGames = createAsyncThunk(
    'games/fetchByIdStatus',
    async () => { 
        try{
            const games = await axios.get(`https://mongodb-api.onrender.com/games`)
            sessionStorage.setItem('games', JSON.stringify(games.data))
            return games.data
        }
        catch(err){
            return err
        }
    }
);

export const gamesSlice = createSlice({
    name: 'gamesReducer',
    initialState,
    reducers: {
        addGame: (state, action) => {
            sessionStorage.removeItem("user")
            state.games.push(action.payload)
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getGames.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getGames.fulfilled, (state, action) => {
          state.status = 'idle';
          state.games = action.payload;
          state.error = null;
        })
        .addCase(getGames.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string;
        });
    },
});

export default gamesSlice.reducer;