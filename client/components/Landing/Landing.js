import React from 'react';
import { graphql, createFragmentContainer }from 'react-relay';
import Page from 'components/Page/Page';
import MyBookList from 'components/MyBookList/MyBookList';
import { authenticatedRoute } from 'modules/auth/utils'


class Landing extends React.Component {
  render() {
    console.log(this.props.viewer)
    return (
      <Page heading='Landing' >
        <p>Welcome, {this.props.viewer.user.email}!</p>
        <MyBookList books={this.props.viewer.user.books}/>
      </Page>
    );
  }
}

const AuthenticatedLanding = authenticatedRoute(Landing);

export default createFragmentContainer(
  AuthenticatedLanding,
  graphql`
    fragment Landing_viewer on Viewer {
      id
      user {
        email
        username
        books {
          name
          author
          ...MyBookList_books
        }
      }
    }
  `,
)
