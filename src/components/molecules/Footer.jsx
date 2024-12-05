export default function Footer(props) {
  return (
    <footer className="footer text-sm py-5 mt-5 bg-white sm:absolute bottom-0 left-0 right-0 p-2">
      © {props.year} Pokephoto Released under MIT License. The source code is
      available on{" "}
      <b>
        <a href="https://github.com/imotD/pokephoto" target="_blank">
          Github
        </a>
      </b>
      .
    </footer>
  );
}
