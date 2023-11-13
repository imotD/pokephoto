import { useState } from "react";

export default function Searching({ onHandleSubmit }) {
  const [searching, setSearching] = useState("");

  const handleInputChange = (e) => {
    setSearching(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onHandleSubmit(searching);
  };
  return (
    <form className="my-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="name pokemon or id"
        className="p-2 bg-slate-100"
        onChange={handleInputChange}
      />
      <button type="submit" className="p-2 bg-slate-200">
        Search
      </button>
    </form>
  );
}
