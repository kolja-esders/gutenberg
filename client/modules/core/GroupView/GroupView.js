import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth/utils';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { Link } from 'found';
import { Button, Header } from 'semantic-ui-react';

import styles from './GroupView.scss';

class GroupView extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  render() {
    const { group, user } = this.props.viewer;
    const inviteLink = `/group/${group.nameUrl}/invite`;
    const memberNodes = group.members.edges;

    return (
      <Page title='Gutenberg' viewer={this.props.viewer} activeGroup={group.name}>
        <section className={styles.container}>
          { memberNodes.length === 1 &&
          <div className={styles.inviteNudge}>
            <Header className={styles.text} size='huge'>{user.firstName}, it's only you.<span className={styles.emoji}></span></Header>
            <Button className={styles.btn} size='massive' as={Link} to={inviteLink} primary>Invite friends</Button>
          </div>
          }
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
            }
          }
        }
      }
    }
  `);
