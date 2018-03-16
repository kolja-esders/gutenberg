import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import { withAuth } from 'modules/auth/utils';

import styles from './ProfileInvitesTab.scss';

class ProfileInvitesTab extends React.Component {
  static defaultProps = {
    visible: true
  };
  static propTypes = {
    visible: PropTypes.bool
  };

  render() {
    const { visible } = this.props;

    if (!visible) {
      return null;
    }

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
