export default function Footer(props) {
  return (
    <footer className="text-sm py-5">
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
