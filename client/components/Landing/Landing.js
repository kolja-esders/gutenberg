import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Page from 'components/Page/Page';
import MyBookList from 'components/MyBookList/MyBookList';
import { authenticatedRoute } from 'modules/auth/utils'
import { Button, Grid } from 'semantic-ui-react';

class Landing extends React.Component {
  render() {
    return (
      <Page title='Gutenberg' viewer={this.props.viewer}>
        <MyBookList bookshelf={this.props.viewer.user.bookshelf}/>
      </Page>
    );
  }
}

const AuthenticatedLanding = authenticatedRoute(Landing);

export default createFragmentContainer(
  AuthenticatedLanding,
  graphql`
    fragment Landing_viewer on Viewer {
      ...Page_viewer
      id
      user {
        email
        username
        bookshelf {
          ...MyBookList_bookshelf
        }
      }
    }
  `,
)
