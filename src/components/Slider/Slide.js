/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Slide = ({ content, index, activeIndex, render, onLoad, loaded }) => (
  <div
    css={css`
      width: 100%;
      height: 100%;
      display: flex;
      position: absolute;
      top: 0;
      transform: ${activeIndex === index && loaded ? `none` : `scale(0.97)`};
      -webkit-transform: ${activeIndex === index && loaded
        ? `none`
        : `scale(0.97)`};
      opacity: ${activeIndex === index && loaded ? 1 : 0};
      transition: all 1s ease-in-out;
      #position: relative;
      #background-attachment: fixed;
      #background-position: center;
      #background-repeat: no-repeat;
      #background-size: cover;
    `}
  >
    {render ? (
      <img
        onLoad={onLoad}
        css={css`
          width: 100%;
          height: 100%;
          position: absolute;
          display: flex;
          object-position: center center;
          object-fit: cover;
        `}
        src={content}
        alt=""
      />
    ) : (
      ``
    )}
  </div>
);

export default Slide;
