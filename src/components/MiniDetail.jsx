import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import pokeBallLoading from "../../image/pokeball.gif";

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
      <div className="absolute rotate-12 -top-1 -right-11 bg-amber-500/55 w-28 h-8 sticky-tape">
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
