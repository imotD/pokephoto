import { useParams } from "react-router-dom";


export default function PokeDetail() {
  const { id } = useParams();
  
  return <h1>Hello World!, ini detail {id} </h1>;
}
