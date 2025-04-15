import React from "react";
import "./Service.css"
// Taken from https://tailgrids.com/components/features-services
const Service = () => {
  return (
    <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20 text-white">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Welcome Back $$Insert Name$$
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Dashboard
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                How may we be of assistance today?
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            title="Stock Analysis History"
            details="Your history of previously analysed stock information. "
            icon={
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image className="w-[36px] h-[36px]"href="src/images/recent-repeat-icon.svg"/>
              </svg>
            }
          />
          <ServiceCard
            title="Analyse a Stock"
            details="Get help in deciding whether a stock is right for you based on what its recent performance in the stock market and current news surrounding the stock."
            icon={
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image className="w-[36px] h-[36px]"href="src/images/analysis-icon.svg"/>
              </svg>
            }
          />
          <ServiceCard
            title="Get Started"
            details="For new members. Learn how to use OMEGA to brighten your investing future."
            icon={
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image className="w-[36px] h-[36px]"href="src/images/suggestion-box-icon.svg"/>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Service;

const ServiceCard = ({ icon, title, details }) => {
  return (
    <>
      <a href="https://www.youtube.com" className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-9 rounded-[20px] p-10 shadow-4 hover:shadow-lg hover:shadow-purple-100 dark:bg-dark-2 md:px-7 xl:px-10 serviceCard" >
          <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl" >
            {icon}
          </div>
          <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
            {title}
          </h4>
          <p className="text-body-color dark:text-dark-6">{details}</p>
        </div>
      </a>
    </>
  );
};