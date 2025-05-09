import Logo from "../../assets/images/pokephoto.png";

export default function Header() {
  return (
    <div className="my-6 sm:p-0 p-5">
      <img
        className="m-auto"
        src={Logo}
        alt="Pokemon logo"
        width="400"
        height="400"
        loading="lazy"
      />
    </div>
  );
}
