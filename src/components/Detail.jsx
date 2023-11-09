import { useState } from "react";

export default function Detail({ data }) {
  const [imageSrc, setImageSrc] = useState("../image/pokeball.gif");

  const handleImageLoad = () => {
    setImageSrc(imgUrlPhoto);
  };

  const imgUrlPhoto = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`;

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
      <p className="capitalize text-sm">{data.name}</p>
    </div>
  );
}
