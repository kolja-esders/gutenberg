/* eslint-disable jsx-a11y/href-no-hash */
import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth/utils';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { Link } from 'found';

import styles from './GroupView.scss';

class GroupView extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  render() {
    const group = this.props.viewer.group;
    const inviteLink = `/group/${group.nameUrl}/invite`;

    return (
      <Page title='Gutenberg' viewer={this.props.viewer} activeGroup={group.name}>
        <section className={styles.container}>
          You are a member of group { group.name }.
          <Link to={inviteLink}>Invite friends</Link>
        </section>
      </Page>
    );
  }
}

export default createFragmentContainer(withAuth(GroupView), graphql`
    fragment GroupView_viewer on Viewer {
      ...Page_viewer
      group(nameUrl: $nameUrl) {
        name
        nameUrl
      }
    }
  `);
