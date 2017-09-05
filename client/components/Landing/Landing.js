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
        <MyBookList book_entries={this.props.viewer.user.books}/>
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
        books {
          ...MyBookList_book_entries
        }
      }
    }
  `,
)
