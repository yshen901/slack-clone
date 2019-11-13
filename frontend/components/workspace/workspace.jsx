import React from 'react';

import WorkspaceSidebarContainer from "./workspace_sidebar_container"
import ChannelContainer from '../channel/channel_container';
import BrowseChannelModal from '../modals/browse_channel_modal';
import NewChannelModalContainer from '../modals/new_channel_modal_container';
import InviteUserModal from '../modals/invite_user_modal';
import SidebarDropdown from '../modals/sidebar_dropdown';

import { hideElements } from '../../util/modal_api_util';

class Workspace extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let { workspaces, workspace_address, channel_id } = this.props;
    let valid = false

    for (let i = 0; i < workspaces.length; i++) {
      if (workspaces[i].address === workspace_address) {
        valid = true;
        
        // DESIGN: SETS SESSION.WORKSPACE_ID, SESSION.USER_CHANNELS, AND ENTITIES.USERS/CHANNELS
        this.props.getWorkspace(workspace_address) 
          .then(
            ({channels}) => {
              let first_channel = Object.keys(channels)[0];
              if (channels[channel_id] === undefined)
                this.props.history.replace(`/workspace/${workspace_address}/${first_channel}`)
            }
          )
      }
    }

    if (!valid) 
      this.props.history.replace('/signin');
    else
      this.props.loadChannel(channel_id);
  }

  // Makes sure you don't go to an invalid channel
  componentDidUpdate(oldProps) {
    if (oldProps.match.params.channel_id !== this.props.match.params.channel_id) {
      if (getState().entities.channels[this.props.match.params.channel_id] === undefined)
        this.props.history.goBack(); //NOTE: BASICALLY GOES BACK TO BEFORE
      else
        this.props.loadChannel(parseInt(this.props.match.params.channel_id));
    }
  }

  render() {
    return (
      <div id="workspace" onClick={() => hideElements("dropdown")}>
        <WorkspaceSidebarContainer />
        <ChannelContainer />

        <SidebarDropdown />
        <BrowseChannelModal />
        <InviteUserModal />
        <NewChannelModalContainer />
      </div>
    )
  }
}

export default Workspace;