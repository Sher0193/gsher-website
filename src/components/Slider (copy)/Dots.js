/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Dot = ({ active }) => (
  <span
    css={css`
      padding: 10px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 50%;
      background: ${active ? "white" : "#232b2b"};
    `}
  />
);

const Dots = ({ slides, activeIndex, handleClick }) => (
  <div
    onClick={handleClick}
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
      <Dot key={slide} active={activeIndex === i} />
    ))}
  </div>
);

export default Dots;