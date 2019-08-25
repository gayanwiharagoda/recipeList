"use strict";
import React from "react";
import { render } from "@testing-library/react";

import MatchSlide from "./MatchSlide";

const renderMatchSlide = (additionalProps = {}) => {
  const team = { home: "home", away: "away" };
  const score = { home: 2, away: 4 };

  return render(
    <MatchSlide
      team={team}
      score={score}
      gameStartsDateAndTime={new Date("2019-08-24T23:11Z")}
      sport={"FOOTBALL"}
      onClickBitPlacement={jest.fn()}
      {...additionalProps}
    />
  );
};

describe("MatchSlide", () => {
  it("show match slide with away and home team name", () => {
    const { getByText } = renderMatchSlide();
    getByText("home - away");
  });

  it("show match slide with away and team score", () => {
    const { getByText } = renderMatchSlide();
    getByText("2 - 4");
  });
});
