import { useState } from "react";
import { useSelector } from "react-redux";

export default function ListPokemon({ data }) {
  const pokeSpritesUrl = useSelector((state) => state.global.pokeSpritesUrl);

  return (
    <div key={data.id} onClick={() => onClickDetail(data.id)}>
      <img
        src={`${pokeSpritesUrl}${data.id}.gif`}
        className="h-10 w-10 border-2 border-black rounded-full bg-slate-200 my-1 hover:bg-yellow-300 cursor-pointer"
        alt="img"
        title={data.name}
        loading="lazy"
      />
    </div>
  );
}
