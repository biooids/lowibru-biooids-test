import React, { useRef } from "react";
import TalentCard from "./TalentCard";
import "./talent.css";

function Talent() {
  const containerRef = useRef(null);

  const scrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: -window.innerHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: window.innerHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="talent-section">
      <div className="text-white bg-amber-700 flex flex-col gap-5">
        <button
          className="arrow-button up bg-black  w-[100px] h-[100px] "
          onClick={scrollUp}
        >
          ↑
        </button>
        <button
          className="arrow-button down bg-black w-[100px] h-[100px]"
          onClick={scrollDown}
        >
          ↓
        </button>
      </div>
      {/* <TalentCard /> */}
      <div className="talent-container" ref={containerRef}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta esse,
          molestiae blanditiis necessitatibus porro sequi libero ducimus
          repellat totam accusamus? Fugit cupiditate odio sequi enim itaque.
          Doloribus eum qui in.
        </div>
        <div>
          Life is a quality that distinguishes matter that has biological
          processes, such as signaling and self-sustaining processes, from
          matter that does not. It is defined descriptively by the capacity for
          homeostasis, organisation, metabolism, growth, adaptation, response to
          stimuli, and reproduction
        </div>
        <div>
          Biology is the scientific study of life. It is a natural science with
          a broad scope but has several unifying themes that tie it together as
          a single, coherent field. For instance, all organisms are made up of
          cells that process hereditary information encoded in genes, which can
          be transmitted to future generations.
        </div>
      </div>
    </div>
  );
}

export default Talent;
