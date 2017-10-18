import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Page from 'components/Page/Page';
import MyBookList from 'components/MyBookList/MyBookList';
import { withAuth } from 'modules/auth/utils'
import { Button, Grid } from 'semantic-ui-react';
import { Link } from 'found'
import styles from './Landing.scss';

class Landing extends React.Component {
  render() {
    return (
      <Page title='Gutenberg' viewer={this.props.viewer}>
        <section className={styles.container}>
          <MyBookList bookshelf={this.props.viewer.user.bookshelf}/>
          <Button primary as={Link} to='/add-book' className={styles.addBook}>Add book</Button>
        </section>
      </Page>
    );
  }
}

export default createFragmentContainer(
  withAuth(Landing),
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
