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
        const responseDataList = res.data.results;
        const dataAddNumber = responseDataList.map((res) => {
          const numberImage = res.url.split("/");

          return {
            id: numberImage[6],
            ...res,
          };
        });

        setDataList(dataAddNumber);
      })
      .catch((e) => {
        console.log("🚀 ~ error", e);
      })
      .finally(() => {
        setLoading(false);
        setDetail({});
      });
  };

  const onClickSearch = async (searchItem) => {
    setLoading(true);
    if (!searchItem) {
      setDataList([]);
      await getAllPokemon();
      setLoading(false);
    } else {
      try {
        await axios.get(URL + searchItem).then((res) => {
          const { id, name } = res.data;

          const pokeItem = {
            name: name,
            url: `https://pokeapi.co/api/v2/pokemon/${id}`,
            id: id,
          };

          setDataList([pokeItem]);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setDetail({});
      }
    }
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

  const listItems = dataList.map((value) => (
    <div key={value.id} onClick={() => onClickDetail(value.id)}>
      <img
        src={`${imgUrl}${value.id}.gif`}
        className="w-10 h-10 rounded-full bg-slate-200 my-1 hover:bg-yellow-300 cursor-pointer"
        alt="img"
        title={value.name}
      />
    </div>
  ));

  return (
    <div className="App">
      <Header />
      <div className="flex items-center gap-2 justify-center">
        <div className="p-5">
          {/* searching */}
          <Searching onHandleSubmit={onClickSearch} />

          {/* canvas pokemon */}
          <div className="grid grid-rows-4 grid-flow-col items-center gap-2">
            {loading ? <Loading /> : dataList.length ? listItems : ""}
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
