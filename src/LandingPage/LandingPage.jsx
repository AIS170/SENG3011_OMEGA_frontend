import "./LandingPage.css";
export default function LandingPage() {
  function handleScroll() {
    console.log("Hello");
  }
  return (
    <div id="LandingPage_Container">
      <section id="LandingPageSection1" onScroll={() => handleScroll()}>
        <div id="LandingPage_IntroductoryText">
          <h1 id="LandingPage_OmegaInvesting">OMEGA Investing</h1>
          <h4 id="LandingPage_StockMarketSimplified">
            The stock market simplified
          </h4>
        </div>
        <button id="GetStartedButton">Get Started</button>
      </section>

      <section id="LandingPageSection2">
        <div id="LandingPage_Analysis" className="LandingPage-leftText">
          <h2>Invest with Confidence</h2>
          <h5>
            OMEGA uses real time financial and news data to make predictions on
            the future performance of different stocks in the stock market
          </h5>
        </div>
      </section>

      <section id="LandingPageSection3">
        <div id="LandingPage_NewHeights" className="LandingPage-rightText">
          <h2>Conquer new Heights</h2>
          <h5>
            Take advantage of OMEGA's assistance to simplify complicated stock
            information into clearer conclusions
          </h5>
        </div>
      </section>

      <section id="LandingPageSection4">
        <div id="LandingPage_GrowMoney" className="LandingPage-leftText">
          <h2>Grow and Diversify</h2>
          <h5>
            OMEGA's vast data collection means you have more choice in deciding
            what stocks will benefit you and your money.
          </h5>
        </div>
      </section>
    </div>
  );
}
