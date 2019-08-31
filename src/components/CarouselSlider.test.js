import React from "react";
import { render } from "@testing-library/react";
import CarouselSlider from "./CarouselSlider";

jest.useFakeTimers();

const renderCarouselSlider = () =>
  render(
    <CarouselSlider>
      <div>slide 1</div>
      <div>slide 2</div>
    </CarouselSlider>
  );

describe("CarouselSlider", () => {
  it("After each 3 seconds should move to next screen", () => {
    const { getByText } = renderCarouselSlider();

    getByText("slide 1");
    jest.advanceTimersByTime(3500);
    getByText("slide 2");
    jest.advanceTimersByTime(3500);
    getByText("slide 1");
  });
});
