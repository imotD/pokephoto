import { useState } from "react";

export default function Detail({ data }) {
  const [imageSrc, setImageSrc] = useState("../image/pokeball.gif");
  const imgUrlPhoto = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`;

  const handleImageLoad = () => {
    setImageSrc(imgUrlPhoto);
  };

  const types = data?.types.map((value, index) => (
    <span className="capitalize  mx-1 bg-blue-100 rounded" key={index}>
      {value.type.name}
      {index < data.types.length - 1 ? ", " : ""}
    </span>
  ));

  const ability = data?.abilities.map((value, index) => (
    <span className="capitalize mx-1 bg-blue-100 rounded" key={index}>
      {value.ability.name}
      {index < data.abilities.length - 1 ? ", " : ""}
    </span>
  ));

  const stats = data?.stats.map((value, index) => (
    <span className="capitalize bg-blue-100 rounded my-1" key={index}>
      {value.stat.name}: {value.base_stat}
    </span>
  ));

  return (
    <div className="p-5 bg-slate-50 pb-10 drop-shadow-lg rotate-3 ">
      <img
        src={imageSrc}
        onLoad={handleImageLoad}
        className="w-28 h-28 bg-photo my-1 p-1 ease-in-out m-auto"
        alt="img"
        title={data.name}
        loading="lazy"
      />
      <p className="capitalize text-sm font-bold mb-1">{data.name}</p>
      <p className="bg-slate-200 text-xs"> Type</p>
      <div className="text-xs my-1">{types}</div>
      <p className="bg-slate-200 text-xs"> Ability</p>
      <div className="text-xs my-1">{ability}</div>
      <p className="bg-slate-200 text-xs"> Stats</p>
      <div class="grid grid-flow-row auto-rows-max text-xs">{stats}</div>
    </div>
  );
}

// https://onnichan.github.io/pokeapi-react/
