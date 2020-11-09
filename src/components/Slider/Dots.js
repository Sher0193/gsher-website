/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Dot = ({ active, handleClick }) => (
  <span
    onClick={handleClick}
    css={css`
      padding: 10px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 50%;
      background: ${active ? "white" : "#232b2b"};
      z-index: 1;
      transition: transform ease 0.1s;
      transition: background ease 1s;
      &:hover {
        transform: scale(1.1);

        -webkit-transform: scale(1.1);
      }
    `}
  />
);

const Dots = ({ slides, activeIndex, dotHandler }) => (
  <div
    css={css`
      position: absolute;
      bottom: 25px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  >
    {slides.map((slide, i) => (
      <Dot
        key={slide}
        active={activeIndex === i}
        handleClick={() => dotHandler(i)}
      />
    ))}
  </div>
);

export default Dots;
