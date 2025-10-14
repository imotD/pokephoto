import { useSelector } from "react-redux";
import { PokemonImageCard } from "./PokemonImageCard";

export default function ListPokemon({ data, handleClickDetail }) {
  const pokeSpritesUrl = useSelector((state) => state.global.pokeSpritesUrl);

  return (
    <>
      <div className="mt-10 grid grid-cols-6 align-center m-auto justify-items-center">
        {data.pages.flatMap((page) =>
          page.data.map((pokemon) => (
            <div
              key={pokemon.id}
              onDoubleClick={() => handleClickDetail(pokemon.id)}
              className="relative cursor-pointer"
            >
              <PokemonImageCard
                imageUrl={`${pokeSpritesUrl}${pokemon.id}.gif`}
                pokemonId={pokemon.id}
                pokemonName={pokemon.name}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
