import React, { useEffect } from "react";
import styled from "styled-components";

import CarouselSlider from "../../components/CarouselSlider";
import MatchSlide from "../../components/MatchSlide";
import { unibetBaseUrl, dateReloadTime } from "../../constants";
// const matchData = {
//     event: {
//         awayName: "away",
//         homeName: "home",
//         sport: "FOOTBALL",
//         state: "STARTED",
//         start: "2019-08-24T23:11Z"
//     },
//     liveData: {
//         score: {
//             home: 1,
//             away: 2,
//         }
//     }
// }

const generatePropsMatchSlider = ({
  event: { homeName, awayName, start, sport, id },
  liveData: { score }
}) => ({
  score,
  team: {
    home: homeName,
    away: awayName
  },
  gameStartsDateAndTime: new Date(start),
  sport,
  eventId: id
});

/**
 * 1.When user refresh what is the behavior dose it extend the time for refreshing data?
 *  Assumption: it dose.
 */
const LiveMatches = ({ fetchUpcomingMatches, upcomingMatches }) => {
  useEffect(() => {
    // fetch on first of the page. but not on the refreshing
    if (!Array.isArray(upcomingMatches) || upcomingMatches.length === 0) {
      fetchUpcomingMatches();
    }

    // reload data each and every three minuets
    const intervalId = setInterval(() => {
      fetchUpcomingMatches();
    }, dateReloadTime);

    // clear interval to avoid memory leaks and unexpected behaviors
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // open unibet page relevant to the game
  const openUnibetPage = eventId => {
    window.open(`${unibetBaseUrl}${eventId}`, "_blank");
  };

  return (
    <BaseCol>
      <HeaderTitle>Live Matches</HeaderTitle>
      <SubTitle>Here is the list of matches that are live right now</SubTitle>
      <BodyContainer>
        <CarouselContainer>
          <CarouselSlider>
            {upcomingMatches.map(upcomingMatch => (
              <MatchSlide
                {...generatePropsMatchSlider(upcomingMatch)}
                onClickBitPlacement={openUnibetPage}
              />
            ))}
          </CarouselSlider>
        </CarouselContainer>
        <DetailsContainer>
          <SubTitle>Live betting</SubTitle>
        </DetailsContainer>
      </BodyContainer>
    </BaseCol>
  );
};

export default LiveMatches;

const BaseCol = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const BaseTitle = styled.div`
  display: flex;
  color: black;
`;

const HeaderTitle = styled(BaseTitle)`
  margin-top: 16px;
  font-size: 1.5rem;
`;

const SubTitle = styled(BaseTitle)`
  margin-top: 24px;
  font-size: 1rem;
`;

const BodyContainer = styled.div`
  margin-top: 16px;
  display: flex;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const CarouselContainer = styled(Col)`
  padding-right: 18px;
  flex: 2;
  border-right: 1px solid #cccccc;
`;

const DetailsContainer = styled(Col)`
  margin-left: 18px;
  flex: 1;
`;
