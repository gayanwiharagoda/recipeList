import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const timeToShowOneSlide = 3000;

const CarouselSlider = ({ children }) => {
  const [slideIndex, setSliderIndex] = useState(0);
  // get number of slides to switch
  const numberOfSlide = children.length;
  // callback help to get the previous value into set interval
  const savedCallback = useRef();
  function callback() {
    // set the index of slid need to show in carousel view
    setSliderIndex((slideIndex + 1) % numberOfSlide);
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    // set intervals to slide change
    const interval = setInterval(tick, timeToShowOneSlide);

    return () => {
      clearInterval(interval)
    }
  }, []);
  
  return <TransitionWrapper>{children[slideIndex]}</TransitionWrapper>;
};


export default CarouselSlider;

const TransitionWrapper = styled.div`
  transition-duration: 3s;
`;
