import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const usePokemonList = () => {
  const pokeApiUrlList = useSelector((state) => state.global.pokeApiUrlList);

  const fetchPokemon = async ({ pageParam = pokeApiUrlList }) => {
    const res = await axios.get(pageParam);

    const dataAddNumber = res.data.results.map((res) => {
      const numberImage = res.url.split("/");
      return {
        id: numberImage[6],
        ...res,
      };
    });

    return {
      data: dataAddNumber,
      next: res.data.next,
    };
  };
  return useInfiniteQuery({
    queryKey: ["pokemon-list"],
    queryFn: fetchPokemon,
    getNextPageParam: (lastPage, allPages) => lastPage.next || undefined,
  });
};

export const usePokemonSearch = (keyword) => {
  const pokeApiUrl = useSelector((state) => state.global.pokeApiUrl);

  const searchPokemon = async ({ pageParam = pokeApiUrl + keyword }) => {
    const res = await axios.get(pageParam);

    const { id, name } = res.data;

    const pokeItem = {
      name: name,
      url: pokeApiUrl + id,
      id: id,
    };

    return {
      pages: [
        {
          data: [pokeItem],
        },
      ],
    };
  };

  return useQuery({
    queryKey: ["pokemon-search", keyword],
    queryFn: searchPokemon,
    enabled: !!keyword,
  });
};

export const usePokemonDetail = (id) => {
  const pokeApiUrl = useSelector((state) => state.global.pokeApiUrl);

  const fetchPokemonDetail = async ({ pageParam = pokeApiUrl + id }) => {
    const res = await axios.get(pageParam);

    return res.data;
  };

  return useQuery({
    queryKey: ["pokemon-detail", id],
    queryFn: fetchPokemonDetail,
    enabled: !!id,
  });
};
