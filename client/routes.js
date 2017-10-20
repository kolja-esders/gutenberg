import Landing from 'components/Landing/Landing'
import Auth from 'modules/auth/Auth'
import SharedBooks from 'modules/core/SharedBooks/SharedBooks'
import AddBookToBookshelf from 'modules/core/AddBookToBookshelf/AddBookToBookshelf'
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

const AddBookToBookshelfQuery = graphql`
  query routes_AddBookToBookshelf_Query {
    viewer {
      ...AddBookToBookshelf_viewer
      ...AddBookToBookshelf_user
      
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
  </Route>
);
