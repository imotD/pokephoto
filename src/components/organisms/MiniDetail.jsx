import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import { useSelector } from "react-redux";
import "../../assets/css/MiniDetail.css";

import PropTypes from "prop-types";
import pokeBallLoading from "../../assets/images/pokeball.gif";

import Button from "../atoms/Button";
import { Link } from "react-router-dom";

export default function MiniDetail({
  data,
  loading = false,
  isShowButton = false,
  isDetail = false,
  isSmall = false,
}) {
  const pokeSpritesPhotoUrl = useSelector(
    (state) => state.global.pokeSpritesPhotoUrl,
  );

  const cardRef = useRef(null);
  const rotateX = useRef(null);
  const rotateY = useRef(null);

  const glareRef = useRef(null);
  const glowRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(pokeBallLoading);

  useEffect(() => {
    if (data?.id) {
      const imgUrlPhoto = isSmall
        ? pokeBallLoading
        : pokeSpritesPhotoUrl + `${data?.id}.png`;

      setImageSrc(imgUrlPhoto);
    }
  }, [data]);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    gsap.set(card, {
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
      willChange: "transform",
    });

    rotateX.current = gsap.quickTo(card, "rotateX", {
      duration: 0.4,
      ease: "power3.out",
    });

    rotateY.current = gsap.quickTo(card, "rotateY", {
      duration: 0.4,
      ease: "power3.out",
    });
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    const glow = glowRef.current;

    if (!card || !glare || !glow) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = -(y - rect.height / 2) / 12;
    const rotY = (x - rect.width / 2) / 12;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.25,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(glare, {
      backgroundPosition: `${percentX}% ${percentY}%`,
      opacity: 0.6,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(glow, {
      x: x - 100,
      y: y - 100,
      opacity: 1,
      duration: 0.2,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(glareRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      to={isSmall && data ? `/poke-detail/${data?.id || "1"}` : "#"}
      className={`${
        isSmall ? "w-32 h-32 p-2 pb-8" : "w-80 h-80 p-5 pb-20"
      }  bg-slate-50 rotate-3 border-2 border-black shaxfdow-photo `}
    >
      <div ref={glowRef} className="holo-glow" />
      <div ref={glareRef} className="holo-glare" />
      <Link
        to={isSmall && data ? `/poke-detail/${data?.id || "1"}` : "#"}
        className="block w-full h-full {`$`}"
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
        <p className={` ${isSmall ? "" : "my-2"} capitalize text-sm font-bold`}>
          {data?.name || "PokeBall"}
        </p>

        {Object.keys(data)?.length > 0 && (
          <div className="pt-5">
            {isShowButton && (
              <Link to={`/poke-detail/${data?.id}`}>
                <Button className="m-auto">Details</Button>
              </Link>
            )}
          </div>
        )}

        {isDetail && Object.keys(data).length !== 0 && (
          <div>
            {data?.types?.map((type, index) => (
              <span
                key={index}
                className={`text-xs rounded-full px-2 py-1 mr-1`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        )}

        <div className="absolute rotate-12 -top-1 sm:-right-11 right-0 bg-amber-500/55 w-28 h-8 sticky-tape">
          <span className="font-bold text-slate-50 drop-shadow-lg">
            {isSmall ? "#??" : data && data?.id ? `#${data.id}` : ""}
          </span>
        </div>
      </Link>
    </div>
  );
}

MiniDetail.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

// https://onnichan.github.io/pokeapi-react/
// https://id.portal-pokemon.com/play/pokedex
// https://www.pokemon.com/us/pokedex
// https://pokeapi.co/docs/v2#locations-section
// https://www.neobrutalism.dev/
