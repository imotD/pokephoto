import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "./components/Loading";
import MiniDetail from "./components/MiniDetail";
import Searching from "./components/Searching";

import Header from "./components/molecules/Header";
import Footer from "./components/molecules/Footer";
import ListPokemon from "./components/molecules/ListPokemon";
import Button from "./components/atoms/Button";

function App() {
  const pokeApiUrl = useSelector((state) => state.global.pokeApiUrl);
  const pokeSpritesUrl = useSelector((state) => state.global.pokeSpritesUrl);
  const pokeApiUrlList = useSelector((state) => state.global.pokeApiUrlList);

  const [dataList, setDataList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detail, setDetail] = useState({});

  const [urlListPoke, setUrlListPoke] = useState(pokeApiUrlList);

  useEffect(() => {
    getAllPokemon();
  }, []);

  const getAllPokemon = () => {
    setLoading(true);

    axios
      .get(urlListPoke)
      .then((res) => {
        const responseDataList = res.data;

        if (responseDataList.next === null) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }

        const dataAddNumber = responseDataList.results.map((res) => {
          const numberImage = res.url.split("/");

          return {
            id: numberImage[6],
            ...res,
          };
        });

        setUrlListPoke(responseDataList.next);

        setDataList((prevData) => [...prevData, ...dataAddNumber]);
      })
      .catch((e) => {
        console.log("🚀 ~ error", e);
      })
      .finally(() => {
        setLoading(false);
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
        await axios.get(pokeApiUrl + searchItem).then((res) => {
          const { id, name } = res.data;

          const pokeItem = {
            name: name,
            url: pokeApiUrl + id,
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
      .get(pokeApiUrl + id)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoadingDetail(false);
      });
  };

  const listItems = (
    <>
      <div className="mt-10 grid grid-cols-6 align-center m-auto justify-items-center ">
        {dataList.map((value) => (
          <div key={value.id} onClick={() => onClickDetail(value.id)}>
            <img
              src={`${pokeSpritesUrl}${value.id}.gif`}
              className="h-10 w-10 border-2 border-black rounded-full bg-slate-200 my-1 hover:bg-yellow-300 cursor-pointer"
              alt="img"
              title={value.name}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="flex align-center justify-center py-5 mb-5">
        <Button
          onClick={getAllPokemon}
          className={
            ("ml-2", isDisabled ? "bg-yellow-100 cursor-not-allowed" : "")
          }
          type="button"
          isDisabled={isDisabled}
        >
          Show more
        </Button>
      </div>
    </>
  );

  return (
    <div className="App h-screen">
      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <div className="flex items-center gap-2 justify-center">
        <div className="pattern-box"></div>
        <div className="w-1/2 p-5 m-auto ">
          {/* SEARCHING */}
          <Searching onHandleSubmit={onClickSearch} />

          {/* CANVAS POKEMON */}
          <div className="w-80 h-96 overflow-scroll	m-auto mt-6 border-2 border-black gradient-list-poke">
            <div className="">
              {loading ? <Loading /> : dataList.length ? listItems : ""}
            </div>
          </div>
        </div>

        {/* PAGE DETAILS */}
        <div className="w-1/2 p-5">
          <MiniDetail loading={loadingDetail} data={detail} />
        </div>
      </div>

      {/* FOOTER */}
      <Footer year="2023" />
    </div>
  );
}

export default App;
