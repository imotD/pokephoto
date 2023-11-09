import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Detail from "./components/Detail";
import Searching from "./components/Searching";

function App() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [searching, setSearching] = useState("");
  const [detail, setDetail] = useState({});

  const imgUrl =
    "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/versions/generation-v/black-white/animated/";

  const URL = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    getAllPokemon();
  }, []);

  const getAllPokemon = () => {
    setLoading(true);
    axios
      .get(URL)
      .then((res) => {
        setDataList(res.data.results);
      })
      .catch((e) => {
        console.log("🚀 ~ error", e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onClickSearch = () => {
    if (!searching) {
      return;
    }

    setLoading(true);

    axios
      .get(URL + searching)
      .then((res) => {
        const { id, name } = res.data;

        const pokeItem = {
          name: name,
          url: `https://pokeapi.co/api/v2/pokemon/${id}`,
          id: id,
        };

        setDataList([pokeItem]);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const onClickDetail = (id) => {
    setLoadingDetail(true);

    axios
      .get(URL + id)
      .then((res) => {
        setDetail(res.data);
        setLoadingDetail(false);
      })
      .catch((e) => {
        setLoadingDetail(false);
      });
  };

  return (
    <div className="App">
      <Header />
      <div className="flex items-center gap-2 justify-center">
        <div className="p-5">
          {/* searching */}
          <Searching
            onClick={onClickSearch}
            disable={!searching}
            onChange={(searching) => setSearching(searching)}
          />

          {/* canvas pokemon */}
          <div className="grid grid-rows-4 grid-flow-col items-center gap-2">
            {loading ? (
              <Loading />
            ) : dataList.length ? (
              dataList.map((value, key) => {
                return (
                  <div
                    key={key}
                    onClick={() =>
                      onClickDetail(!value.id ? key + 1 : value.id)
                    }
                  >
                    <img
                      src={`${imgUrl}${!value.id ? key + 1 : value.id}.gif`}
                      className="w-10 h-10 rounded-full bg-slate-200 my-1 hover:bg-yellow-300 cursor-pointer"
                      alt="img"
                      title={value.name}
                    />
                  </div>
                );
              })
            ) : (
              <p>Pokemon not found</p>
            )}
          </div>
        </div>

        {/* detail */}
        <div className="my-5">
          {loadingDetail ? (
            <Loading />
          ) : (
            detail &&
            Object.keys(detail).length !== 0 && <Detail data={detail} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
