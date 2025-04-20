export default function ScrollButton({ left, right, leftRef, rightRef }) {
  function scrollLeft() {
    leftRef.current.scrollIntoView({ behavior: "instant", block: "start" });
  }

  function scrollRight() {
    rightRef.current.scrollIntoView({ behavior: "instant", block: "start" });
  }
  return (
    <>
      <div className="w-screen grid grid-cols-[30%_40%_30%] justify-self-auto justify-items-center">
        {left && <div
          onClick={() => scrollLeft()}
          className="bg-white bg-[url(./src/images/leftArrow.png)] bg-size-[60%] bg-center bg-no-repeat col-span-1 col-start-1 border border-red-3 p-[40px] w-[20px] h-[20px] rounded-[50%]"
        />
        }
        {right && 
        <div
          onClick={() => scrollRight()}
          className="bg-white bg-[url(./src/images/rightArrow.png)] bg-size-[60%] bg-center bg-no-repeat col-span-1 col-start-3 border border-red-3 p-[40px] w-[20px] h-[20px] rounded-[50%]"
        />
        }
      </div>
    </>
  );
}
