/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay';
import Page from 'components/Page/Page';
import SharedBooksList from 'components/SharedBooksList/SharedBooksList';
import { authenticatedRoute } from 'modules/auth/utils'

class SharedBooks extends React.Component {
  render() {
    return (
      <div>
        <Page title='Books' viewer={this.props.viewer}>
          <SharedBooksList viewer={this.props.viewer}/>
        </Page>
      </div>
    );
  }
}

const AuthenticatedSharedBooks = authenticatedRoute(SharedBooks);

export default createFragmentContainer(AuthenticatedSharedBooks, graphql`
  fragment SharedBooks_viewer on Viewer {
    ...Page_viewer
    ...SharedBooksList_viewer
  }
`);
