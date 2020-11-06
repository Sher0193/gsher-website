/** @jsx jsx */
import { useState, useEffect, useRef } from "react";
import { css, jsx } from "@emotion/core";
import SliderContent from "./SliderContent";
import Slide from "./Slide";
import Arrow from "./Arrow";
import Dots from "./Dots";

const getWidth = () => window.innerWidth;

/**
 * @function Slider
 */
const Slider = (props) => {
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45,
    loaded: false,
  });
  const { loaded, translate, transition, activeIndex } = state;

  const autoPlayRef = useRef();
  const resizeRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    //     const resize = () => {
    //       resizeRef.current();
    //     };

    const interval = setInterval(play, props.autoPlay * 1000);
    //const onResize = window.addEventListener("resize", resize);

    return () => {
      clearInterval(interval);
      //window.removeEventListener("resize", onResize);
    };
  }, [props.autoPlay]);

  const handleResize = () => {
    setState({ ...state, activeIndex: 0, translate: 0, transition: 0.45 });
  };

  const nextSlide = (e) => {
    if (activeIndex === props.slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth(),
    });
  };

  const prevSlide = (e) => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (props.slides.length - 1) * getWidth(),
        activeIndex: props.slides.length - 1,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth(),
    });
  };

  const render = (index) => {
    if (activeIndex === props.slides.length - 1) {
      return index === 0 || index >= activeIndex - 1;
    } else if (activeIndex === 0) {
      return index === props.slides.length - 1 || index <= activeIndex + 1;
    } else {
      return index >= activeIndex - 1 && index <= activeIndex + 1;
    }
  };

  const clickDot = (index) => {
    console.log(index);
    setState({ activeIndex: index });
  };

  const onLoad = () => {
    setState({
      ...state,
      loaded: true,
    });
  };

  return (
    <div css={SliderCSS}>
      <a href="/gallery">
        <SliderContent
          translate={translate}
          transition={transition}
          width={getWidth() * props.slides.length}
        >
          {props.slides.map((slide, i) => (
            <Slide
              key={slide + i}
              content={slide}
              activeIndex={activeIndex}
              index={i}
              render={render(i)}
              onLoad={!loaded ? onLoad : ``}
              loaded={loaded}
            />
          ))}
        </SliderContent>
      </a>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      <Dots
        slides={props.slides}
        activeIndex={activeIndex}
        dotHandler={clickDot}
      />
    </div>
  );
};

/*{!props.autoPlay && (
        <>
          <Arrow direction="left" handleClick={prevSlide} />
          <Arrow direction="right" handleClick={nextSlide} />
        </>
      )}

      <Dots slides={props.slides} activeIndex={activeIndex} />*/

Slider.defaultProps = {
  slides: [],
  autoPlay: null,
};

const SliderCSS = css`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

export default Slider;
