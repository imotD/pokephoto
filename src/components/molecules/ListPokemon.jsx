import Button from "../atoms/Button";

import { useSelector } from "react-redux";

export default function ListPokemon({ data, isDisabled, handleClickDetail, handleClickAll }) {

  const pokeSpritesUrl = useSelector((state) => state.global.pokeSpritesUrl);

  
  return (
    <>
      <div className="mt-10 grid grid-cols-6 align-center m-auto justify-items-center ">
        {data.map((value) => (
          <div key={value.id} onClick={() => handleClickDetail(value.id)}>
            <img
              src={`${pokeSpritesUrl}${value.id}.gif`}
              className="h-10 w-10 border-2 border-black rounded-full bg-slate-200 my-1 hover:bg-yellow-300 cursor-pointer"
              alt="img"
              title={value.name}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="flex align-center justify-center py-5 mb-5">
        <Button
          onClick={handleClickAll}
          className={
            ("ml-2", isDisabled ? "bg-yellow-100 cursor-not-allowed" : "")
          }
          type="button"
          isDisabled={isDisabled}
        >
          Show more
        </Button>
      </div>
    </>
  );
}
