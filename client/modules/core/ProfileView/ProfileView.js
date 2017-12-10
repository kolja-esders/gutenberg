import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth/utils';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { Link } from 'found';
import { Segment, Button, Header, Table, Rating } from 'semantic-ui-react';

import styles from './GroupView.scss';

class GroupView extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  render() {
    const { group, user } = this.props.viewer;
    const inviteLink = `/group/${group.nameUrl}/invite`;
    const members = group.members.edges;

    return (
      <Page title='Gutenberg' viewer={this.props.viewer} activeGroup={group.name}>
        <section className={styles.container}>
              <Segment attached='top' padded='very'>
                { members.length === 1 ?
                  <div className={styles.inviteNudge}>
                    <Header className={styles.text} size='huge'>{user.firstName}, it's only you.<span className={styles.emoji}></span></Header>
                    <Button className={styles.btn} size='massive' as={Link} to={inviteLink} primary>Invite friends</Button>
                  </div>
                :
              <div>
                <div className={styles.groupInfo}>
                  <Header as='h1'>{ group.name }</Header>
                  <Button.Group basic>
                    <Button active>Books</Button>
                    <Button>Members</Button>
                    <Button>Invites</Button>
                  </Button.Group>
                </div>
              <Header as='h1'>Members</Header>
              <p>{ members.map(m => `${m.node.firstName} ${m.node.lastName}`).join(', ') }</p>
              <Header as='h1'>Books</Header>
                <Table singleLine className={styles.books}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>User</Table.HeaderCell>
                      <Table.HeaderCell>Title</Table.HeaderCell>
                      <Table.HeaderCell>Author</Table.HeaderCell>
                      <Table.HeaderCell>Rating</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>

                    { members.map(m =>
                      m.node.books &&
                      m.node.books.edges.map(e =>
                        <Table.Row key={e.node.id}>
                          <Table.Cell>{m.node.firstName}</Table.Cell>
                          <Table.Cell>{e.node.book.title}</Table.Cell>
                          <Table.Cell>{e.node.book.author}</Table.Cell>
                          <Table.Cell>
                            <Rating defaultRating={e.node.rating} maxRating={5} />
                          </Table.Cell>
                        </Table.Row>
                      )
                    )}
                  </Table.Body>
                </Table>
              </div>
            }
          </Segment>
        </section>
      </Page>
    );
  }
}

export default createFragmentContainer(withAuth(GroupView), graphql`
    fragment GroupView_viewer on Viewer {
      ...Page_viewer
      user {
        firstName
      }
      group(nameUrl: $nameUrl) {
        name
        nameUrl
        members {
          edges {
            node {
              firstName
              lastName
              books {
                edges {
                  node {
                    id
                    rating
                    state
                    book {
                      title
                      author
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
