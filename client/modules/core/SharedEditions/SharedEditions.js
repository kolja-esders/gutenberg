/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay';
import Page from 'components/Page/Page';
import SharedEditionsList from 'components/SharedEditionsList/SharedEditionsList';
import { withAuth } from 'modules/auth/utils'

class SharedEditions extends React.Component {
  render() {
    return (
      <div>
        <Page title='Books' viewer={this.props.viewer}>
          <SharedEditionsList viewer={this.props.viewer}/>
        </Page>
      </div>
    );
  }
}


export default createFragmentContainer(
  withAuth(SharedEditions),
  graphql`
    fragment SharedEditions_viewer on Viewer {
      ...Page_viewer
      ...SharedEditionsList_viewer
    }
  `
);
