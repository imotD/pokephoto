import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import pokeBallLoading from "../../src/assets/images/pokeball.gif";

import Button from "./atoms/Button";
import { Link } from "react-router-dom";

export default function Detail({ data, loading }) {
  const pokeSpritesPhotoUrl = useSelector(
    (state) => state.global.pokeSpritesPhotoUrl
  );

  const [imageSrc, setImageSrc] = useState(pokeBallLoading);

  useEffect(() => {
    if (data?.id) {
      const imgUrlPhoto = pokeSpritesPhotoUrl + `${data?.id}.png`;
      setImageSrc(imgUrlPhoto);
    }
  }, [data, pokeSpritesPhotoUrl]);

  return (
    <div className="p-5 bg-slate-50 pb-20 w-80 h-80 rotate-3 border-2 border-black shadow-photo ">
      <img
        src={imageSrc}
        className="bg-photo border-2 border-black w-full h-full my-1 p-5 ease-in-out m-auto"
        alt="img"
        title={data?.name || "Pokemon"}
        onError={() => setImageSrc(pokeBallLoading)}
        loading="lazy"
      />
      <p className="capitalize text-sm my-2 font-bold">
        {data.name || "PokeBall"}
      </p>

      {Object.keys(data).length !== 0 && (
        <div className="pt-5">
          <Link to={`/poke-detail/${data?.id}`}>
            <Button className="m-auto">Details</Button>
          </Link>
        </div>
      )}

      <div className="absolute rotate-12 -top-1 sm:-right-11 right-0 bg-amber-500/55 w-28 h-8 sticky-tape">
        <span className="font-bold text-slate-50 drop-shadow-lg">
          #{data?.id || "00"}
        </span>
      </div>
    </div>
  );
}

Detail.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

Detail.defaultProps = {
  data: {
    id: 35,
    name: "Pokemon",
  },
};

// https://onnichan.github.io/pokeapi-react/
// https://id.portal-pokemon.com/play/pokedex
// https://www.pokemon.com/us/pokedex
// https://pokeapi.co/docs/v2#locations-section
