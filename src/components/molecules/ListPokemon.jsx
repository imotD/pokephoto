import Button from "../atoms/Button";
import pokeBallLoading from "../../assets/images/pokeball.gif";

import { useSelector } from "react-redux";
import { useState } from "react";

export default function ListPokemon({ data, handleClickDetail }) {
  const pokeSpritesUrl = useSelector((state) => state.global.pokeSpritesUrl);
  const [loadedImage, setLoadedImage] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImage((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <div className="mt-10 grid grid-cols-6 align-center m-auto justify-items-center">
        {data.pages.flatMap((page) =>
          page.data.map((value) => (
            <div
              key={value.id}
              onClick={() => handleClickDetail(value.id)}
              className="relative"
            >
              {!loadedImage[value.id] && (
                <img
                  src={pokeBallLoading}
                  className="h-10 w-10 border-2 border-black dark:border-white rounded-full bg-slate-200 my-1 absolute top-0"
                  alt="img"
                />
              )}

              <img
                src={`${pokeSpritesUrl}${value.id}.gif`}
                className={`h-10 w-10 border-2 border-black dark:border-white rounded-full bg-slate-200 my-1 hover:bg-yellow-300  ${
                  loadedImage[value.id]
                    ? `opacity-100 cursor-pointer`
                    : `opacity-0`
                }`}
                alt="img"
                title={value.name}
                onLoad={() => handleImageLoad(value.id)}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
