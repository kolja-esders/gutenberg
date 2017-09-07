/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay';
import Page from 'components/Page/Page';
import SharedBooksList from 'components/SharedBooksList/SharedBooksList';
import { authenticatedRoute } from 'modules/auth/utils'

class GroupPage extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        hello world { this.props.router.match.params.name_url  }
      </div>
    );
  }
}

const AuthenticatedGroupPage = authenticatedRoute(GroupPage);
export default AuthenticatedGroupPage;

//export default createFragmentContainer(AuthenticatedGroupPage, graphql`
    //fragment SharedBooks_viewer on Viewer {
      //...Page_viewer
      //id
      //user {
        //email
        //username
        //books {
          //...SharedBooksList_book_entries
        //}
      //}
    //}
  //`  
//);
