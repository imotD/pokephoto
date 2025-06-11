import Logo from "../../assets/images/pokephoto.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Link to="/">
      <div className="mt-6 mb-9 sm:p-0 p-5">
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
  );
}
