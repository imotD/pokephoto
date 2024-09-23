import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Loading from "./components/Loading";
import Detail from "./components/Detail";
import Searching from "./components/Searching";

import Header from "./components/molecules/Header";
import Footer from "./components/molecules/Footer";

import Button from "./components/atoms/Button";

function App() {
  const pokeApiUrl = useSelector((state) => state.global.pokeApiUrl);
  const pokeSpritesUrl = useSelector((state) => state.global.pokeSpritesUrl);

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getAllPokemon();
  }, []);

  const getAllPokemon = () => {
    setLoading(true);
    axios
      .get(pokeApiUrl)
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
        setLoadingDetail(false);
      })
      .catch((e) => {
        setLoadingDetail(false);
      });
  };

  const listItems = dataList.map((value) => (
    <div key={value.id} onClick={() => onClickDetail(value.id)}>
      <img
        src={`${pokeSpritesUrl}${value.id}.gif`}
        className="h-10 w-10 border-2 border-black rounded-full bg-slate-200 my-1 hover:bg-yellow-300 cursor-pointer"
        alt="img"
        title={value.name}
        loading="lazy"
      />
    </div>
  ));

  return (
    <div className="App">
      {/* <div className="min-h-28 absolute pattern-box top-0 bottom-0 right-0 left-0"></div> */}
      <Header />
      <div className="flex items-center gap-2 justify-center">
        <div className="pattern-box"></div>
        <div className="w-1/2 p-5 m-auto">
          {/* SEARCHING */}
          <Searching onHandleSubmit={onClickSearch} />

          {/* CANVAS POKEMON */}
          <div className="mt-10 grid grid-rows-4 grid-flow-col items-center gap-2 justify-items-center w-1/3 m-auto">
            {loading ? <Loading /> : dataList.length ? listItems : ""}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col items-center mt-5">
            <span className="text-sm text-gray-700">
              Showing <span className="font-semibold text-gray-900 ">1</span> to{" "}
              <span className="font-semibold text-gray-900 ">10</span> of{" "}
              <span className="font-semibold text-gray-900 ">100</span> Entries
            </span>

            <div className="inline-flex mt-2 xs:mt-0">
              <Button className="ml-2" type="submit">
                Prev
              </Button>
              <Button className="ml-2" type="submit">
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* PAGE DETAILS */}
        <div className="w-1/2 p-5">
          <Detail loading={loadingDetail} data={detail} />
        </div>
      </div>

      <Footer year="2023" />
    </div>
  );
}

export default App;
