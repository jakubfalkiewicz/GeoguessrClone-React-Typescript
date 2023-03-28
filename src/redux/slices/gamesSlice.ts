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
    async (id: string) => { 
        try{
            const games = await axios.get(`https://mongodb-api.onrender.com/games/byUser/${id}`)
            // const games = await axios.get(`http://localhost:4000/games/byUser/${id}`)
            return games.data
        }
        catch(err){
            return err
        }
    }
);

export const createGame = createAsyncThunk(
  'games/createGame',
  async (game: IGame) => { 
      try{
          // const gameToAdd = await axios.post(`https://mongodb-api.onrender.com/games/`, {...game})
          // const gameToAdd = await axios.post(`http://localhost:4000/games/`, {...game})
          return game
      }
      catch(err){
          return err
      }
  }
);

export const updateGame = createAsyncThunk(
  'games/updateGame',
  async (game: IGame) => { 
      try{
          const gameToUpdate = await axios.put(`https://mongodb-api.onrender.com/games/${game.gameId}`,{...game})
          // const gameToUpdate = await axios.put(`http://localhost:4000/games/${game.gameId}`,{...game})
          // sessionStorage.setItem('games', JSON.stringify(games.data))
          return game
      }
      catch(err){
          return err
      }
  }
);

export const UPDATE_GAME = 'gamesReducer/updateGame';

export const gamesSlice = createSlice({
    name: 'gamesReducer',
    initialState,
    reducers: {
        addGame: (state, action) => {
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
        })
        .addCase(updateGame.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateGame.fulfilled, (state, action) => {
          state.status = 'idle';
          state.games = state.games.map(game => game.gameId === action.payload.gameId ? action.payload : game)
          state.error = null;
        })
        .addCase(updateGame.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string;
        })
        .addCase(createGame.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createGame.fulfilled, (state, action) => {
          state.status = 'idle';
          state.games.push(action.payload);
          state.error = null;
        })
        .addCase(createGame.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string;
        });
    },
});

export default gamesSlice.reducer;