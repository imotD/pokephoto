import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    pokeSpritesPhotoUrl:
      "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/",
    pokeApiUrl: "https://pokeapi.co/api/v2/pokemon/",
    pokeApiUrlList: "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0",
    pokeSpritesUrl:
      "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/versions/generation-v/black-white/animated/",
  },
  reducers: {
    setPokeApiUrlList: (state, action) => {
      state.pokeApiUrlList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPokeApiUrlList } = globalSlice.actions;

export default globalSlice.reducer;
