import "../../assets/css/Home.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Loading from "../Loading";
import MiniDetail from "../organisms/MiniDetail";
import Searching from "../Searching";

import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import ListPokemon from "../molecules/ListPokemon";

function Home() {
  const pokeApiUrl = useSelector((state) => state.global.pokeApiUrl);
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
          console.log(numberImage, "numberImage");
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

  return (
    <div className="App sm:h-screen">
      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <div className="sm:flex items-center gap-2 justify-center">
        <div className="pattern-box"></div>
        <div className="sm:w-1/2 sm:p-5 m-auto ">
          {/* SEARCHING */}
          <Searching onHandleSubmit={onClickSearch} />

          {/* CANVAS POKEMON */}
          <div className="w-80 h-96 overflow-scroll	m-auto mt-6 border-2 border-black gradient-list-poke">
            <div className="">
              {loading ? (
                <Loading />
              ) : dataList.length ? (
                <ListPokemon
                  data={dataList}
                  isDisabled={isDisabled}
                  handleClickDetail={(id) => onClickDetail(id)}
                  handleClickAll={getAllPokemon}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* PAGE DETAILS */}
        <div className="flex sm:w-1/2 p-5 justify-center sm:justify-start sm:mt-0 mt-10">
          <MiniDetail
            loading={loadingDetail}
            data={detail}
            isShowButton={true}
          />
        </div>
      </div>

      <Footer year="2023" />
    </div>
  );
}

export default Home;
