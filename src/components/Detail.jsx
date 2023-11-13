import { useState } from "react";

export default function Detail({ data }) {
  const [imageSrc, setImageSrc] = useState("../image/pokeball.gif");
  const imgUrlPhoto = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`;

  const handleImageLoad = () => {
    setImageSrc(imgUrlPhoto);
  };

  const types = data?.types.map((value, index) => (
    <span className="capitalize" key={index}>
      {value.type.name}
      {index < data.types.length - 1 ? ", " : ""}
    </span>
  ));

  return (
    <div className="p-5 bg-slate-50 pb-10 drop-shadow-lg rotate-3 ">
      <img
        src={imageSrc}
        onLoad={handleImageLoad}
        className="w-28 h-28 bg-photo my-1 p-1 ease-in-out"
        alt="img"
        title={data.name}
        loading="lazy"
      />
      <p className="capitalize text-sm font-bold">{data.name}</p>
      <div className="text-xs">{types}</div>
    </div>
  );
}

// https://onnichan.github.io/pokeapi-react/
