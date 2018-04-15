import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Page from 'components/Page/Page';
import MyEditionList from 'components/PersonalEditionList/PersonalEditionList';
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

            <div className={styles.reading}>
              <Header floated='left' as='h2'>Reading</Header>
              <PersonalEditionList editions={this.props.viewer.user.books} state='reading'/>
            </div>

            <div className={styles.read}>
              <Header floated='left' as='h2'>Read</Header>
              <PersonalEditionList editions={this.props.viewer.user.books} state='read'/>
            </div>

            <div className={styles.to_read}>
              <Header floated='left' as='h2'>To-Read</Header>
              <PersonalEditionList editions={this.props.viewer.user.books} state='to-read'/>
            </div>
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
          ...PersonalEditionList_books
        }
      }
    }
  `,
);
