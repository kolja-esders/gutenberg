/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { withAuth } from 'modules/auth/utils'

class GroupCreateView extends React.Component {
  render() {
    const group = this.props.viewer.group
    return (
      <div>
        You're a member of group { group.name }.
      </div>
    )
  }
}

export default createFragmentContainer(
  withAuth(GroupCreateView),
  graphql`
    fragment GroupCreateView_viewer on Viewer {
      id
    }
  `
);
