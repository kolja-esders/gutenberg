import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import { withAuth } from 'modules/auth/utils';

import styles from './ProfileInvitesTab.scss';

class ProfileInvitesTab extends React.Component {
  static defaultProps = {};
  static propTypes = {};

  render() {
    return (
      <Tab.Pane className={styles.root}>
        ProfileInvitesTab
      </Tab.Pane>
    );
  }
}

export default createFragmentContainer(withAuth(ProfileInvitesTab), graphql`
  fragment ProfileInvitesTab_viewer on Viewer {
    user {
      id
    }
  }
`);
