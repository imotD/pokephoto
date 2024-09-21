import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Detail from "./components/Detail";
import Searching from "./components/Searching";

import Header from "./components/molecules/Header";
import Footer from "./components/molecules/Footer";

import Button from "./components/atoms/Button";

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
          {/* searching */}
          <Searching onHandleSubmit={onClickSearch} />

          {/* canvas pokemon */}
          <div className="mt-10 grid grid-rows-4 grid-flow-col items-center gap-2 justify-items-center w-1/3 m-auto">
            {loading ? <Loading /> : dataList.length ? listItems : ""}
          </div>

          <div className="flex flex-col items-center mt-5">
            {/* <!-- Help text --> */}
            <span className="text-sm text-gray-700">
              Showing <span className="font-semibold text-gray-900 ">1</span> to{" "}
              <span className="font-semibold text-gray-900 ">10</span> of{" "}
              <span className="font-semibold text-gray-900 ">100</span> Entries
            </span>
            {/* <!-- Buttons --> */}
            <div className="inline-flex mt-2 xs:mt-0">
              {/* <button class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Prev
              </button> */}
              {/* <button class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
              </button> */}
              <Button className="ml-2" type="submit">
                Prev
              </Button>
              <Button className="ml-2" type="submit">
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* detail */}
        <div className="w-1/2 p-5">
          {/* {loadingDetail ? (
            <Loading />
          ) : (
            detail &&
            Object.keys(detail).length !== 0 && <Detail data={detail} />
          )} */}
          <Detail />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
