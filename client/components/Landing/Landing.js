import React from 'react';
import { graphql, createFragmentContainer }from 'react-relay';
import Page from 'components/Page/Page';
import { authenticatedRoute } from 'modules/auth/utils'


const Landing = ({ viewer }) =>
  <Page heading='Landing' >
    <p>Welcome, {viewer.user.email}!</p>
  </Page>;

const AuthenticatedLanding = authenticatedRoute(Landing);

export default createFragmentContainer(
  AuthenticatedLanding,
  graphql`
    fragment Landing_viewer on Viewer {
      id
      user {
        email
        username
      }
    }
  `,
)
