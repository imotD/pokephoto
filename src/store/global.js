import { createSlice } from "@reduxjs/toolkit";

export const global = createSlice({
  name: "global",
  initialState: {
    pokeSpritesPhotoUrl:
      "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/",
    pokeApiUrl: "https://pokeapi.co/api/v2/pokemon/",
    pokeSpritesUrl:
      "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/versions/generation-v/black-white/animated/",
  },
  reducers: {
    // setImage
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = global.actions;

export default global.reducer;
