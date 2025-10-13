import Logo from "../../assets/images/pokephoto.png";

import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="mt-6 mb-9 sm:p-0 p-5 flex items-center justify-center">
      <Link to="/">
        <div className="">
          <img
            className="m-auto"
            src={Logo}
            alt="Pokemon logo"
            width="400"
            height="400"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="ml-3">
        <ThemeToggle />
      </div>
    </header>
  );
}
