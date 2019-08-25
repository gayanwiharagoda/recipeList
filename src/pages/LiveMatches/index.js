import { connect } from "react-redux";

import LiveMatches from "./LiveMatches";
import { fetchUpcomingMatchesAction as fetchUpcomingMatches } from "../../models/liveMatches";

const mapStateToProps = state => ({
  upcomingMatches: state.liveMatches.upcomingMatches
});

const mapDispatchToProps = {
  fetchUpcomingMatches
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveMatches);
