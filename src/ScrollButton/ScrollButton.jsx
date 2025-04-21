export default function ScrollButton({
  left,
  right,
  leftRef,
  rightRef,
  leftText,
  rightText,
}) {
  function scrollLeft() {
    leftRef.current.scrollIntoView({ behavior: "instant", block: "start" });
  }

  function scrollRight() {
    rightRef.current.scrollIntoView({ behavior: "instant", block: "start" });
  }
  return (
    <>
      <div className="w-screen grid grid-cols-[30%_40%_30%] justify-self-auto justify-items-center">
        {left && (
          <div
            onClick={() => scrollLeft()}
            className="text-white underline col-span-1 col-start-1 bg-black px-[6%] py-[3%] hover:cursor-pointer hover:bg-white hover:text-black"
          >
            &larr; {leftText}
          </div>
        )}
        {right && (
          <div
            onClick={() => scrollRight()}
            className="text-white underline col-span-1 col-start-3 bg-black px-[6%] py-[3%] hover:cursor-pointer hover:bg-white hover:text-black"
          >
            {rightText} &rarr;
          </div>
        )}
      </div>
    </>
  );
}
