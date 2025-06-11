import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "../molecules/Header";
import MiniDetail from "../organisms/MiniDetail";

import axios from "axios";

export default function PokeDetail() {
  const pokeApiUrl = useSelector((state) => state.global.pokeApiUrl);
  const pokeApiUrlEvolution = useSelector(
    (state) => state.global.pokeApiEvolutionUrl
  );

  const { id } = useParams();

  const [detail, setDetail] = useState({});
  const [evolution, setEvolution] = useState({});

  useEffect(() => {
    axios
      .get(pokeApiUrl + id)
      .then((res) => {
        setDetail(res.data);
        evolutionChains();
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);

  const evolutionChains = () => {
    axios
      .get(pokeApiUrlEvolution + id)
      .then((res) => {
        const {
          chain: { evolves_to },
        } = res.data;

        const evolutionPoke = [
          {
            id: evolves_to[0]?.species?.url.split("/")[6],
            name: evolves_to[0]?.species?.name,
          },
          {
            id: evolves_to[0]?.evolves_to[0]?.species?.url.split("/")[6],
            name: evolves_to[0]?.evolves_to[0]?.species?.name,
          },
        ];

        setEvolution(evolutionPoke);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="d-flex text-center itemsåß-center justify-items-center">
      <Header />
      <div className="pattern-box"></div>
      <div className="flex justify-center items-center gap-12">
        <MiniDetail data={evolution[0]} isSmall={true} />
        <MiniDetail data={detail} isDetail={true} />
        <MiniDetail data={evolution[1]} isSmall={true} />
      </div>
    </div>
  );
}
