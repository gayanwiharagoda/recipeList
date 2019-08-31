import React, { useEffect } from "react";
import styled from "styled-components";

import CarouselSlider from "../../components/CarouselSlider";
import MatchSlide from "../../components/MatchSlide";
import { unibetBaseUrl, dateReloadTime } from "../../constants";

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
    <MainContainer>
    <BaseCol>
      <HeaderTitle>Live Matches</HeaderTitle>
      <SubTitle topMargin>
        Here is the list of matches that are live right now
      </SubTitle>
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
          <Paragraph>
            Place your bets as the action unfolds. We offer a wide selection of
            live betting event and you can please both single and combination
            bets.
          </Paragraph>
          <Paragraph>
            You will be able to see an in-play scoreboard with the current
            result and match stats, while on selecting events you will be also
            be able to watch the action live with Unibet TV on the desktop site.
          </Paragraph>
        </DetailsContainer>
      </BodyContainer>
    </BaseCol>
    </MainContainer>
  );
};

export default LiveMatches;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const BaseCol = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  max-width: 900px;
`;

const BaseTitle = styled.div`
  display: flex;
  color: black;
`;

const HeaderTitle = styled(BaseTitle)`
  margin-top: 16px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const SubTitle = styled(BaseTitle)`
  ${p => p.topMargin && `margin-top: 18px;`}
  font-size: 0.96rem;
  font-weight: 600;
`;

const BodyContainer = styled.div`
  margin-top: 16px;
  display: flex;
`;

const Paragraph = styled.p`
  margin: 18px 0px 0px 0px;
  color: #2b2a2a;
  font-weight: 400;
  font-size: 0.90rem;
  line-height: 1.3;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const CarouselContainer = styled(Col)`
  padding-right: 18px;
  flex: 8;
  border-right: 1px solid #cccccc;
`;

const DetailsContainer = styled(Col)`
  margin-left: 18px;
  flex: 3;
`;
