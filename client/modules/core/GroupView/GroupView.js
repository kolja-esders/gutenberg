/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay';
import Page from 'components/Page/Page';
import SharedBooksList from 'components/SharedBooksList/SharedBooksList';
import { authenticatedRoute } from 'modules/auth/utils'

class GroupView extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        test
      </div>
    )
  }
}

export default createFragmentContainer(authenticatedRoute(GroupView), graphql`
    fragment GroupView_viewer on Viewer {
      group(nameUrl: $nameUrl) {
        id
        name
      }
    }
  `  
);
