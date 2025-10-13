import "../../assets/css/Home.css";

import { useState } from "react";

import Loading from "../molecules/Loading";
import MiniDetail from "../organisms/MiniDetail";
import Searching from "../Searching";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import ListPokemon from "../molecules/ListPokemon";
import Button from "../atoms/Button";

import {
  usePokemonList,
  usePokemonSearch,
  usePokemonDetail,
} from "../../hook/usePokemon";

function Home() {
  const [searchItem, setSearchItem] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const {
    data: listData,
    isPending: isPendingList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonList();

  const { data: searchData, isPending: isPendingSearch } =
    usePokemonSearch(searchItem);

  const handleSearch = (query) => {
    setSearchItem(query);
  };

  const { data: detailData, isPending: isPendingDetail } =
    usePokemonDetail(selectedId);

  const onClickDetail = (id) => {
    setSelectedId(id);
  };

  const pokemonToRender = searchItem ? searchData : listData;
  const pokemonIsLoading = isPendingList;

  return (
    <div className="App sm:h-screen dark:bg-slate-800">
      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <div className="sm:flex items-center gap-2 justify-center">
        {/* PATTERN-BOX */}
        <div className="pattern-box"></div>

        <div className="sm:w-1/2 sm:p-5 m-auto ">
          {/* SEARCHING */}
          <Searching onHandleSubmit={handleSearch} />

          {/* CANVAS POKEMON */}
          <div className="w-80 h-96 overflow-scroll	m-auto mt-6 border-2 border-black dark:border-white gradient-list-poke">
            <div className="">
              {pokemonIsLoading ? (
                <Loading />
              ) : pokemonToRender ? (
                <ListPokemon
                  data={pokemonToRender}
                  handleClickDetail={(id) => onClickDetail(id)}
                />
              ) : (
                ""
              )}

              {/* PAGINATION */}
              {!searchItem && hasNextPage && (
                <div className="flex align-center justify-center py-5 mb-5">
                  <Button
                    onClick={() => fetchNextPage()}
                    className={`ml-2 ${
                      isFetchingNextPage && "bg-yellow-100 cursor-not-allowed"
                    }`}
                    type="button"
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PAGE DETAILS */}
        <div className="flex sm:w-1/2 p-5 justify-center sm:justify-start sm:mt-0 mt-10">
          <MiniDetail
            loading={isPendingDetail}
            data={detailData || {}}
            isShowButton={true}
          />
        </div>
      </div>

      <Footer year="2023" />
    </div>
  );
}

export default Home;
