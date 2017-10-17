import Landing from 'components/Landing/Landing'
import Auth from 'modules/auth/Auth'

import { Route, makeRouteConfig } from 'found'
import React from 'react'
import { graphql } from 'react-relay'

export default makeRouteConfig(
  <Route path="/">
    <Route
      Component={Landing}
      query={graphql`
        query routes_Landing_Query {
          viewer {
            ...Landing_viewer
          }
        }
      `}
    />
    <Route
      path="login"
      Component={Auth}
      query={graphql`
        query routes_Auth_Query {
          viewer {
            ...Auth_viewer
          }
        }
      `}
    />
  </Route>
);

