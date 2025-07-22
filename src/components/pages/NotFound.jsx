import { Link } from "react-router-dom";
import ImageNotFound from "../../assets/images/notfound.png";
import "../../assets/css/NotFound.css";

const NotFound = () => {
  return (
    <div className="page">
      <h1 className="font-bold text-3xl">Oops! Snorlax is blocking the path</h1>
      <img src={ImageNotFound} width="500" alt="404" />
      <p>
        The page you're looking for is unreachable. Looks like you need a Poké
        Flute to move on!
      </p>
      <Link
        className="mt-4 py-3 px-6 bg-amber-400 rounded-full text-black	"
        to="/"
      >
        Go Back to Safety
      </Link>
    </div>
  );
};

export default NotFound;
