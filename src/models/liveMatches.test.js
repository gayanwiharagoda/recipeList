import { put, call } from "redux-saga/effects";
import {
  fetchUpcomingMatchesSaga,
  fetchUpcomingMatchesSuccessAction,
  fetchUpcomingMatchesFailedAction
} from "./liveMatches";
import { getLiveMatches } from "../services/liveMatches";

jest.mock("../services/liveMatches");


describe("fetchUpcomingMatchesSaga", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
  it("fetching upcomingMatches successfully", () => {
    const matchList = [
      {
        matchId: "1"
      },
      {
        matchId: "2"
      }
    ];
    const gen = fetchUpcomingMatchesSaga();
    expect(gen.next().value).toEqual(call(getLiveMatches));
    expect(gen.next({ liveEvents: matchList }).value).toEqual(
      put(fetchUpcomingMatchesSuccessAction(matchList))
    );
  });

  it("fetching upcomingMatches failed", () => {
    const error = {
        message: "error in fetching match details"
    };
    const gen = fetchUpcomingMatchesSaga();
    expect(gen.next().value).toEqual(call(getLiveMatches));
    expect(gen.throw(error).value).toEqual(
      put(fetchUpcomingMatchesFailedAction(error))
    );
  });
});
