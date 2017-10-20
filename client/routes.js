import Landing from 'components/Landing/Landing'
import Auth from 'modules/auth/Auth'
import SharedBooks from 'modules/core/SharedBooks/SharedBooks'
import AddBookToBookshelf from 'modules/core/AddBookToBookshelf/AddBookToBookshelf'
import GroupView from 'modules/core/GroupView/GroupView'
import GroupCreateView from 'modules/core/GroupCreateView/GroupCreateView'

import { Route, makeRouteConfig } from 'found'
import React from 'react'
import { graphql } from 'react-relay'

const LandingQuery = graphql`
  query routes_Landing_Query {
    viewer {
      ...Landing_viewer
    }
  }
`

const AuthQuery = graphql`
  query routes_Auth_Query {
    viewer {
      ...Auth_viewer
    }
  }
`

const SharedBooksQuery = graphql`
  query routes_SharedBooks_Query {
    viewer {
      ...SharedBooks_viewer
    }
  }
`

const GroupViewQuery = graphql`
  query routes_GroupView_Query($nameUrl: String!) {
    viewer {
      ...GroupView_viewer
    }
  }
`

const GroupCreateViewQuery = graphql`
  query routes_GroupCreateView_Query {
    viewer {
      ...GroupCreateView_viewer
    }
  }
`

const AddBookToBookshelfQuery = graphql`
  query routes_AddBookToBookshelf_Query {
    viewer {
      ...AddBookToBookshelf_viewer
    }
  }
`

export default makeRouteConfig(
  <Route path="/">
    <Route Component={Landing} query={LandingQuery} />
    <Route Component={Auth} query={AuthQuery}>
      <Route path="login" />
      <Route path="signup" />
    </Route>
    <Route path="add-book" Component={AddBookToBookshelf} query={AddBookToBookshelfQuery}/>
    <Route path="shared-books" Component={SharedBooks} query={SharedBooksQuery}/>
    <Route path="group/:nameUrl" Component={GroupView} query={GroupViewQuery}/>
    <Route path="create" Component={GroupCreateView} query={GroupCreateViewQuery}/>
  </Route>
);

