import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import pokeBallLoading from "../../assets/images/pokeball.gif";

import Button from "../atoms/Button";
import { Link } from "react-router-dom";

export default function Detail({
  data,
  loading = false,
  isShowButton = false,
  isDetail = false,
  isSmall = false,
}) {
  const pokeSpritesPhotoUrl = useSelector(
    (state) => state.global.pokeSpritesPhotoUrl
  );

  const [imageSrc, setImageSrc] = useState(pokeBallLoading);

  useEffect(() => {
    if (data?.id) {
      const imgUrlPhoto = isSmall
        ? pokeBallLoading
        : pokeSpritesPhotoUrl + `${data?.id}.png`;
      setImageSrc(imgUrlPhoto);
    }
  }, [data, pokeSpritesPhotoUrl]);

  return (
    <Link
      to={isSmall ? `/poke-detail/${data?.id || "1"}` : "#"}
      className={`${
        isSmall ? "w-32 h-32 p-2 pb-8" : "w-80 h-80 p-5 pb-20"
      }  bg-slate-50  rotate-3 border-2 border-black shadow-photo`}
    >
      <img
        src={imageSrc}
        className={`${
          isSmall ? "p-2 sepia " : "p-5"
        } bg-photo border-2 border-black w-full h-full my-1 ease-in-out m-auto`}
        alt="img"
        title={data?.name || "Pokemon"}
        onError={() => setImageSrc(pokeBallLoading)}
        loading="lazy"
      />
      <p className={` ${isSmall ? "" : "my-2"}capitalize text-sm font-bold`}>
        {data.name || "PokeBall"}
      </p>

      {isShowButton && Object.keys(data).length !== 0 && (
        <div className="pt-5">
          <Link to={`/poke-detail/${data?.id}`}>
            <Button className="m-auto">Details</Button>
          </Link>
        </div>
      )}

      {isDetail && Object.keys(data).length !== 0 && (
        <div>
          {data?.types?.map((type, index) => (
            <span key={index} className={`text-xs rounded-full px-2 py-1 mr-1`}>
              {type.type.name}
            </span>
          ))}
        </div>
      )}

      <div className="absolute rotate-12 -top-1 sm:-right-11 right-0 bg-amber-500/55 w-28 h-8 sticky-tape">
        <span className="font-bold text-slate-50 drop-shadow-lg">
          #{isSmall ? "??" : data?.id || "00"}
        </span>
      </div>
    </Link>
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
// https://www.neobrutalism.dev/
