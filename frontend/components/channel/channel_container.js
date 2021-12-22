import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { restartDmChannel } from '../../actions/dm_channel_actions';

import Channel from './channel';

const mapStateToProps = (state, ownProps) => ({
  workspace_address: ownProps.match.params.workspace_address,
  channel: state.entities.channels[ownProps.match.params.channel_id],
  channel_id: ownProps.match.params.channel_id,
  messages: state.entities.messages,
  user_id: state.session.user_id
})

const mapDispatchToProps = (dispatch) => ({
  restartDmChannel: (dmChannelInfo) => dispatch(restartDmChannel(dmChannelInfo))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Channel))