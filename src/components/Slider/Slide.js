/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Slide = ({ content, index, activeIndex, render }) => (
  <div
    css={css`
      ${render ? `background-image: url("${content}")` : ``};
      width: 100%;
      height: 100%;
      display: flex;
      position: absolute;
      top: 0;
      transform: ${activeIndex === index ? `none` : `scale(0.97)`};
      -webkit-transform: ${activeIndex === index ? `none` : `scale(0.97)`};
      opacity: ${activeIndex === index ? 1 : 0};
      transition: all 1s ease-in-out;
      #position: relative;
      #background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      ${activeIndex === index ? `z-index: 1;` : ``}
    `}
  />
);

export default Slide;
