import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import IMap from "../../interfaces/IMap";


export interface mapsState {
  status: 'idle' | 'loading' | 'failed';
  maps: IMap[];
  error: null | string;
}

const initialState: mapsState = {
  status: 'idle',
  maps: [],
  error: null,
};

export const getMaps = createAsyncThunk(
    'maps/fetchByIdStatus',
    async () => { 
        try{
            const maps = await axios.get(`https://mongodb-api.onrender.com/maps`)
            sessionStorage.setItem('maps', JSON.stringify(maps.data))
            return maps.data
        }
        catch(err){
            return err
        }
    }
);

export const mapsSlice = createSlice({
    name: 'mapsReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getMaps.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getMaps.fulfilled, (state, action) => {
          state.status = 'idle';
          state.maps = action.payload;
          state.error = null;
        })
        .addCase(getMaps.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message as string;
        });
    },
});

export default mapsSlice.reducer;