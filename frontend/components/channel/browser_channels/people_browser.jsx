import React from "react";
import { withRouter } from "react-router";
import { startDmChannel } from "../../../actions/dm_channel_actions";
import { getUserName, photoUrl } from "../../../selectors/selectors";
import { toggleElements } from "../../../util/modal_api_util";

class PeopleBrowser extends React.Component {
  constructor(props) {
    super(props);

    // capSearch is so we don't have to do uppercase on caps everytime
    this.state = {
      search: "",
      capSearch: ""
    }

    this.createDmChannel = this.createDmChannel.bind(this);
    this.goToChannel = this.goToChannel.bind(this);
    this.update = this.update.bind(this);

    this.allUsers = this.allUsers.bind(this);
  }

  update(e) {
    this.setState({
      search: e.currentTarget.value,
      capSearch: e.currentTarget.value.toUpperCase()
    });
  }

  createDmChannel(userIds, workspaceId) {
    dispatch(startDmChannel({
      user_1_id: userIds[0], 
      user_2_id: userIds[1],
      workspace_id: workspaceId
    })).then(({dmChannelUser}) => {  // REMEMBER THE THING PASSED BACK IS ACTION
      this.goToChannel(dmChannelUser.channel_id);
      this.setState({
        search: "",
        capSearch: ""
      });
    });
  }

  goToChannel(channel_id) {
    let workspace_address = this.props.match.params.workspace_address;
    this.props.history.push(`/workspace/${workspace_address}/${channel_id}`);
  }

  getUserInfo(user) {
    let icon = <i className="fas fa-circle inactive-circle"></i>
    if (user.logged_in)
      icon = <i className="fas fa-circle active-circle-dark"></i>

    let profileImage = <div className="browse-modal-user-image">
      <img src={photoUrl(user)}/>
    </div>

    return (
      <div className="browse-modal-user">
        {profileImage}
        <div className="browse-modal-user-info">
          <div className="browse-modal-username">
            {getUserName(user)} {icon} 
          </div>
          <div className="browse-modal-occupation">
            {user.what_i_do}
          </div>
        </div>
      </div>
    )
  }

  // search by username, full name, or display name
  userInSearch(user) {
    let { capSearch } = this.state;
    
    // uppercase all parameters for searching
    let { email, full_name, display_name } = user;
    [email, full_name, display_name] = [email.toUpperCase(), full_name.toUpperCase(), display_name.toUpperCase()];
    


    if (email.startsWith(capSearch) || full_name.startsWith(capSearch) || display_name.startsWith(capSearch))
      return true;
    return false;
  }

  allUsers() {
    let channelsDisplay = [];
    let placeholders = [];
    let users = getState().entities.users;
    let currentUserId = getState().session.user_id;
    let workspaceId = getState().session.workspace_id;

    let usersArray = Object.values(users);

    
    // Only display users once someone has started to search
    // if (this.state.search.length > 0) {
    for (let i = 0; i < usersArray.length; i++) {
      if (usersArray[i].id != currentUserId && this.userInSearch(usersArray[i])) {
        channelsDisplay.push(
          <div 
            key={i} 
            onClick={() => this.props.showUser(usersArray[i].id)}>
            {this.getUserInfo(usersArray[i])}
          </div>
        )
      }
    }
    
    for (let i = 0; i < 10; i++) {
      channelsDisplay.push(
        <div key={i + usersArray.length}>
          <div className="browse-modal-user placeholder"></div>
        </div>
      );
    }

    return channelsDisplay;
  }

  render() {
    let channelsDisplay = this.allUsers(this.state.search);

    return (
      <div className="browser-channel" onClick={e => e.stopPropagation()}>
        <div className="browser-channel-top">
          <div className="browser-channel-nav">
            <h1 className="browser-channel-title">People</h1>
            <div className="browser-channel-action" onClick={() => toggleElements("invite-user-modal")}>Invite People</div>
          </div>
          <div className="browser-channel-search">
            <i className='fas fa-search search-icon'></i> 
            <input type="text" id="search-bar"
              onChange={this.update}
              value={this.state.search}
              placeholder="Search by name or email"
              autoFocus/>
          </div>
          <h1 className="browser-channel-header">
            {channelsDisplay.length - 10} {this.state.search ? (channelsDisplay.length == 11 ? "result" : "results") : "members"}
          </h1>
        </div>
        <div className="browser-channel-content">
          <div className="browser-channel-grid">
            {channelsDisplay}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PeopleBrowser);