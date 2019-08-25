import React from "react";
import formateDate from "dateformat";
import styled from "styled-components";

import Button from "./Button";
import { isToday } from "../utils/dateUtils";
import { dateFormat, timeFormat, sports } from "../constants";
import basketballIcon from "../assets/sportIcon/basketball.png";
import defaultIcon from "../assets/sportIcon/defaultIcon.png";
import footballIcon from "../assets/sportIcon/football.png";
import tennisIcon from "../assets/sportIcon/tennis.png";

const getDate = gameStartsDateAndTime =>
  isToday(gameStartsDateAndTime)
    ? "Today"
    : formateDate(gameStartsDateAndTime, dateFormat);

const getTime = gameStartsDateAndTime =>
  formateDate(gameStartsDateAndTime, timeFormat);

// pick the icon related to sport
const getImageBySport = sport => {
  if (sport === sports.FOOTBALL) {
    return footballIcon;
  }
  if (sport === sport.BASKETBALL) {
    return basketballIcon;
  }
  if (sport === sport.tennisIcon) {
    return tennisIcon;
  }

  return defaultIcon;
};

// List seems Lives events. Chance of getting started date is possible in following cases
// when game is running more than one day
const MatchSlide = props => {
  const {
    score,
    team,
    gameStartsDateAndTime,
    sport,
    onClickBitPlacement,
    eventId
  } = props;

  const date = getDate(gameStartsDateAndTime);
  const time = getTime(gameStartsDateAndTime);

  return (
    <SliderBase>
      {sport}
      {score && <ScoreText>{`${score.home} - ${score.away}`}</ScoreText>}
      <TeamDetailRow>
        <Icon src={getImageBySport(sport)} />
        <TeamText>{`${team.home} - ${team.away}`}</TeamText>
      </TeamDetailRow>
      <TeamText marginTop>{`${date}, ${time}`}</TeamText>
      <BitButton onClick={() => onClickBitPlacement(eventId)}>
        Place a bet
      </BitButton>
    </SliderBase>
  );
};

export default MatchSlide;

const BitButton = styled(Button)`
  margin-top: 16px;
`;

const TeamDetailRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const Icon = styled.img`
  margin-right: 8px;
  width: 18px;
  height: 18px;
`;

const BaseSpan = styled.span`
  font-size: 1rem;
  font-weight: 600;
  ${p => p.marginTop && "margin-top: 16px;"}
`;

const ScoreText = styled(BaseSpan)`
  color: #fec80d;
`;

const TeamText = styled(BaseSpan)`
  color: white;
`;

const SliderBase = styled.div`
  display: flex;
  padding: 24px;
  background: #222222;
  color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
