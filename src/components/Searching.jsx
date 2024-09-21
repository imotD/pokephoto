import { useState } from "react";

import Input from "./atoms/Input";
import Button from "./atoms/Button";

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
    <div className="flex justify-center">
      <form className="my-3 flex" onSubmit={handleSubmit}>
        <Input
          value={searching}
          setValue={setSearching}
          placeholder="name pokemon"
          onChange={handleInputChange}
        />
        <Button className="ml-2" type="submit">
          Find
        </Button>
      </form>
    </div>
  );
}
