import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Page from 'components/Page/Page';
import MyBookList from 'components/MyBookList/MyBookList';
import { withAuth } from 'modules/auth/utils';
import { Button } from 'semantic-ui-react';
import { Link } from 'found';
import styles from './HomeView.scss';

class HomeView extends React.Component {
  render() {
    return (
      <Page title='Gutenberg' viewer={this.props.viewer}>
        <section className={styles.container}>
          <MyBookList books={this.props.viewer.user.books}/>
          <Button primary as={Link} to='/add-book' className={styles.addBook}>Add book</Button>
        </section>
      </Page>
    );
  }
}

export default createFragmentContainer(
  withAuth(HomeView),
  graphql`
    fragment HomeView_viewer on Viewer {
      ...Page_viewer
      id
      user {
        books {
          ...MyBookList_books
        }
      }
    }
  `,
);
