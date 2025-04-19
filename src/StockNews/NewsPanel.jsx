export default function NewsPanel({
  title,
  description,
  keywords,
  url,
  imageUrl,
  publishedAt,
  source
}) {
  const addDefaultImg = ev => {
    ev.target.src = "./omega.png"
  }

  return (
    <div className="flex relative w-[60%] mx-[12%] mb-[24px] mt-[24px] p-[2%] border-2 border-gray-400">
      <div className="mt-[1%] flex justify-center items-center w-[40%] p-[2%]">
        <img className="max-h-[100%]" src={imageUrl} alt={imageUrl} onError={addDefaultImg}/>
      </div>
      <div className="mt-[1%] w-[60%]">
        <a href={url} className="underline text-blue-700"><h2 className="text-[26px] text-center px-[14px]">{title}</h2></a>
        <br></br>
        <p><b>Snippet:</b></p>
        <h4>{description}</h4>
        <br></br>

        <div><b>Publication Date:</b> {publishedAt.split('T')[0]}</div>
        <div><b>Source:</b> {source}</div>
      </div>
    </div>
  )

}