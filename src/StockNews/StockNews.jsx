import { useEffect, useState } from "react"
import moment from "moment"
import NewsPanel from "./NewsPanel"
import Navbar from "../Navbar/Navbar"

export default function StockForecasts() {

  const [newsInfo, setNewsInfo] = useState([])
  const ENDPOINT = `https://zxskle2a1h.execute-api.ap-southeast-2.amazonaws.com/default/omega_fetch_news_stream`
  const [informationLoaded, setInformationLoaded] = useState(false)
  useEffect(() => {
    var runApi = 0
    if (localStorage.getItem("news_feed") === null) {
      runApi = 1;
    } else {
      const currData = JSON.parse(localStorage.getItem("news_feed"))
      const retrievalDate = currData.date;
      if (moment(retrievalDate).isBefore(moment().format("YYYY-MM-DD"))) {
        runApi = 2;
      }
    }
    if (runApi === 1 || runApi === 2) {
      fetch(ENDPOINT)
      .then(res => res.json())
      .then(res_data => {
        setNewsInfo(res_data.data)
        const newsObj = {
          date: moment().format("YYYY-MM-DD"),
          data: res_data.data
        }
        localStorage.setItem("news_feed", JSON.stringify(newsObj))
        setInformationLoaded(true)

      })
    } else {
      const currData = JSON.parse(localStorage.getItem("news_feed")).data
      setNewsInfo(currData)
      setInformationLoaded(true)
    }
  }, [])

  if (informationLoaded) {
    return (
      <>
        <Navbar currPage={"News Feed"} />
        <h1 className="text-[40px] text-center mt-[5%]">Today's News Feed</h1>
        <div className="flex justify-center flex-wrap">
          {newsInfo.map((data, i) => {
            const title = data.title;
            const description = data.description;
            const keywords = data.keywords;
            const url = data.url;
            const publishedAt = data.published_at;
            const source = data.source
            const imageUrl = data.image_url

            return (
              <NewsPanel
                title={title} 
                description={description} 
                keywords={keywords}
                url={url}
                imageUrl={imageUrl}
                publishedAt={publishedAt}
                source={source}
                key={i}
              />
            )
            
          })}
        </div>
      </>
    )
  } else {
    return (
      <>
        <Navbar currPage="News Feed"/>
        <div className="mt-[20%] text-[42px] flex justify-center align-items">
          <span>Loading News ...</span>
        </div>
      </>
    )
  }
  
}