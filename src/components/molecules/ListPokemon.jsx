import Button from "../atoms/Button";
import pokeBallLoading from "../../assets/images/pokeball.gif";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ListPokemon({
  data,
  isDisabled,
  handleClickDetail,
  handleClickAll,
}) {
  const pokeSpritesUrl = useSelector((state) => state.global.pokeSpritesUrl);
  const [loadedImage, setLoadedImage] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImage((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    data.forEach((value) => {
      const img = new Image();
      img.src = `${pokeSpritesUrl}${value.id}.gif`;
      img.onload = () => {
        setLoadedImage((prev) => ({ ...prev, [value.id]: true }));
      };
    });
  }, [data]);

  return (
    <>
      <div className="mt-10 grid grid-cols-6 align-center m-auto justify-items-center ">
        {data.map((value, index) => (
          <div
            key={index}
            onClick={() => handleClickDetail(value.id)}
            className="relative"
          >
            {!loadedImage[value.id] && (
              <img
                src={pokeBallLoading}
                className="h-10 w-10 border-2 border-black rounded-full bg-slate-200 my-1 absolute top-0"
                alt="img"
              />
            )}

            <img
              src={`${pokeSpritesUrl}${value.id}.gif`}
              className={`h-10 w-10 border-2 border-black rounded-full bg-slate-200 my-1 hover:bg-yellow-300  ${
                loadedImage[value.id]
                  ? `opacity-100 cursor-pointer`
                  : `opacity-0`
              }`}
              alt="img"
              title={value.name}
              onLoad={() => handleImageLoad(value.id)}
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
