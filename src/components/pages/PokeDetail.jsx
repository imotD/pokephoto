import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "../molecules/Header";
import MiniDetail from "../MiniDetail";

import axios from "axios";


export default function PokeDetail() {
  const pokeApiUrl = useSelector((state) => state.global.pokeApiUrl);

  const { id } = useParams();

  const [detail, setDetail] = useState({});


  useEffect(() => {
    axios
      .get(pokeApiUrl + id)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((e) => {
        console.error(e);
      })
  }, [id]);


  return (
    <div className="d-flex text-center itemsåß-center justify-items-center">
      <Header />
      <div className="pattern-box"></div>
      <MiniDetail data={detail} loading={false} />
    </div>
  );
}
