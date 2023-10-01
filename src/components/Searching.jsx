export default function Searching({ onClickSearch, disable, searching }) {
  return (
    <form className="my-3" onSubmit={onClickSearch}>
      <input
        type="text"
        placeholder="name pokemon or id"
        className="p-2 bg-slate-100"
        onChange={(e) => searching.onChange(e.target.value)}
      />
      <button
        disabled={disable}
        onClick={onClickSearch}
        type="button"
        className="p-2 bg-slate-200"
      >
        Search
      </button>
    </form>
  );
}
