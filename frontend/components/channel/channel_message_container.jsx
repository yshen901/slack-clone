import React from 'react';
import withRouter from 'react-router'

const mapStateToProps = (state, ownProps) => ({
  current_user_id: state.session.user_id,
  messages: state.entities.messages,
  user_saved_messages: state.session.user_saved_messages,
  workspace_id: state.session.workspace_id
});

const mapDispatchToProps = dispatch => ({
  postMessageReact: (message_react) => dispatch(postMessageReact(message_react)),
  deleteMessageReact: (message_react) => dispatch(deleteMessageReact(message_react)),
  postMessageSave: (message_save) => dispatch(postMessageSave(message_save)),
  deleteMessageSave: (message_save) => dispatch(deleteMessageSave(message_save)),
  receiveMessageSave: (message_save) => dispatch(receiveMessageSave(message_save)),
  removeMessageSave: (message_save) => dispatch(removeMessageSave(message_save)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
))(ChannelChat);