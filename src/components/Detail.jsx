export default function Detail({ data }) {
    const imgUrlPhoto =
        "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/";

    return (
        <div className="p-5 bg-slate-50 pb-10 drop-shadow-lg rotate-3">
            <img
                src={`${imgUrlPhoto}${data.id}.svg`}
                className="w-28 h-28 bg-photo my-1 p-1"
                alt="img"
                title={data.name}
                loading="lazy"
            />
        </div>
    )
}