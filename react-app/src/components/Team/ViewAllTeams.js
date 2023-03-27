import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchAllTeams } from "../../store/team";
import { authenticate } from "../../store/session";
import CreateTeamModal from "./CreateTeamModal";
import { fetchCreateMembership } from "../../store/membership";
import arrayOfColors from "../../assets/ArrayOfColors";

const ViewAllTeams = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showTModal, setShowTModal] = useState(false);

  const findProjectTest = async () => {
    const returnTeams = await dispatch(fetchAllTeams());
    const returnUser = await dispatch(authenticate());
  };

  useEffect(() => {
    findProjectTest();
  }, [dispatch]);

  let user = useSelector((state) => {
    return state.session.user;
  });
  let allTeamsObj = useSelector((state) => {
    return state.team;
  });
  let allTeams = Object.values(allTeamsObj);

  const handleCreateMembership = async (teamId) => {
    await dispatch(fetchCreateMembership(teamId))
      .then(history.push(`/profile`)) //this isn't working at all
      .catch(async (err) => {
        //console.log('5555555555', err)
      });
  };
  return (
    <div className="col lr-margin-med">
      <h1 className="tb-margin lr-margin-x-small">All Teams</h1>

      <div className="row jc-st">
        <div className="all-teams-name ">
          <div className="l-margin-small">Team Name</div>
        </div>
        <div className="all-teams-owner">
          <div className="l-margin-small">Owner</div>
        </div>
        <div className="all-teams-members">
          <div className="l-margin-small">Members</div>
        </div>
      </div>
      {/* <div className='long-gray-line'></div> */}

      {allTeams && !allTeams.length && (
        <div>This team does not yet have any projects</div>
      )}

      {allTeams &&
        allTeams.map((team) => {
          return (
            <div className="all-team-row">
              <Link key={team.id} to={`/teams/${team.id}`} className="no-und">
                <div className="row">
                  <div className="row all-teams-name">
                    <div className="box-circle-mem ai-c jc-c">
                      <div
                        className="solid-round-sq ai-c jc-c"
                        style={{ backgroundColor: arrayOfColors[team.id] }}
                      >
                        <i className="fa-solid fa-list-ul"></i>
                      </div>
                    </div>

                    <div className="tb-margin should-wrap-100-per lr-margin-small ai-c">
                      {" "}
                      {team.name}{" "}
                    </div>
                  </div>
                  <div className="row all-teams-owner ai-c">
                    <div className="box-circle-mem">
                      <div
                        className="memberCircle"
                        style={{
                          backgroundColor: arrayOfColors[team.owner.id],
                        }}
                      >
                        {team.owner.username.slice(0, 2)}
                      </div>
                    </div>{" "}
                    &nbsp;&nbsp;
                    <div className="tb-margin ai-c">{team.owner.username}</div>
                  </div>
                  <div className="row all-teams-members scroller-members">
                    {team.memberships &&
                      team.memberships.map((member) => (
                        <div className="box-circle-mem">
                          <div
                            className="memberCircle"
                            style={{
                              backgroundColor:
                                arrayOfColors[member.users[0].id],
                            }}
                          >
                            {member.users[0].username.slice(0, 2)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* <div className='long-gray-line'></div> */}
              </Link>
            </div>
          );
        })}
      {user && (
        <div className="ai-c all-teams-create">
          <div className="row ai-c tb-margin">
            <button
              onClick={() => setShowTModal(true)}
              className="no-bor bg-white jc-st ai-c cursor pad-0"
            >
              <div className="dotted-round-sq jc-c ai-c font-small-med pad-02 lr-margin-small">
                <i className="fa-solid fa-plus"></i>
              </div>
              <div className="font-med">Create Team</div>
            </button>
            <CreateTeamModal
              showTModal={showTModal}
              setShowTModal={setShowTModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllTeams;
