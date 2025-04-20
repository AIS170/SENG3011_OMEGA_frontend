export default function NewsPanel({
  title,
  description,
  keywords,
  url,
  imageUrl,
  publishedAt,
  source,
}) {
  const addDefaultImg = (ev) => {
    ev.target.src = "./omega.png";
  };

  return (
    <a
      href={url}
      target="_blank"
      className="flex relative w-[100%] mx-[12%] mb-[4%] p-[2%] hover:shadow-[0_24px_24px_rgba(0,0,0,0.6)] shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-4xl bg-white"
    >
      <div className="mt-[1%] flex justify-center items-center w-[40%] p-[2%]">
        <img
          className="max-h-[100%]"
          src={imageUrl === "" ? "./omega.png" : imageUrl}
          alt={imageUrl}
          onError={addDefaultImg}
        />
      </div>
      <div className="mt-[1%] w-[60%]">
        <a href={url} target="_blank" className="underline text-blue-700">
          <h2 className="text-[calc(1vh+1.2vw)] text-center px-[14px]">
            {title}
          </h2>
        </a>
        <br></br>

        <p className="text-[calc(0.8vh+1vw)]">
          <b>Snippet:</b>
        </p>
        <p className="text-[calc(0.8vh+1vw)]">{description}</p>
        <br></br>

        <p className="text-[calc(0.8vh+1vw)]">
          <b>Publication Date:</b> {publishedAt.split("T")[0]}
        </p>
        <p className="text-[calc(0.8vh+1vw)]">
          <b>Source:</b> {source}
        </p>
      </div>
    </a>
  );
}
