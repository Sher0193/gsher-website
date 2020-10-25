/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const SliderContent = (props) => (
  <div
    css={css`
      transition: all ${props.transition}s ease-in-out;
      -webkit-transition: all ${props.transition}s ease-in-out;
      height: 100%;
      width: 100%;
    `}
  >
    {props.children}
  </div>
);

export default SliderContent;
