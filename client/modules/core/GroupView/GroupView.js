/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay';
import SharedBooksList from 'components/SharedBooksList/SharedBooksList';
import { withAuth } from 'modules/auth/utils'

class GroupView extends React.Component {
  render() {
    const group = this.props.viewer.group
    return (
      <div>
        You're a member of group { group.name }.
      </div>
    )
  }
}

export default createFragmentContainer(authenticatedRoute(GroupView), graphql`
  fragment GroupView_viewer on Viewer {
    group(nameUrl: $nameUrl) {
      name
    }
  }
`);
