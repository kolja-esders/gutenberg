import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Page from 'components/Page/Page';
import MyBookList from 'components/MyBookList/MyBookList';
import { withAuth } from 'modules/auth/utils';
import { Button, Segment, Header } from 'semantic-ui-react';
import { Link } from 'found';
import styles from './HomeView.scss';
import classNames from 'classnames';

class HomeView extends React.Component {
  render() {
    return (
      <Page title='Gutenberg' viewer={this.props.viewer}>
        <section className={styles.container}>
          <Segment className={styles.segment} padded='very'>
            <div className={styles.head}>
              <Header floated='left' as='h1'>Bookshelf</Header>
              <Button floated='right' basic color='green' as={Link} to='/add-book' className={styles.upperText} floated='right'>Add book</Button>
            </div>
            <MyBookList books={this.props.viewer.user.books}/>
          </Segment>
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
