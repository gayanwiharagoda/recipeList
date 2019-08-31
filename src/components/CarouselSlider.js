import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const timeToShowOneSlide = 3000;
const transitionTime = 500;
const mountedStyle = { opacity: 1, transition: "opacity 500ms ease-in" };
const unmountedStyle = { opacity: 0, transition: "opacity 500ms ease-in" };

const CarouselSlider = ({ children }) => {
  const [slideIndex, setSliderIndex] = useState(0);
  const [transition, setTransition] = useState(false);

  // get number of slides to switch
  const numberOfSlide = children.length;

  useEffect(() => {
    let interval;
    if (!transition) {
      // set timer to slide change
      interval = setTimeout(() => {
        setTransition(true);
      }, timeToShowOneSlide);
    } else {
      //set timer for transition
      interval = setTimeout(() => {
        setTransition(false);
        setSliderIndex((slideIndex + 1) % numberOfSlide);
      }, transitionTime);
    }

    return () => {
      // clear timeout to avoid memory leaking issues
      clearTimeout(interval);
    };
  }, [transition]);

  return (
    <TransitionWrapper style={transition ? unmountedStyle : mountedStyle}>
      {children[slideIndex]}
    </TransitionWrapper>
  );
};

export default CarouselSlider;

const TransitionWrapper = styled.div``;
