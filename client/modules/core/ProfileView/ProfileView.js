import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth/utils';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { Link } from 'found';
import { Segment, Button, Header, Table, Rating } from 'semantic-ui-react';

import styles from './ProfileView.scss';

class ProfileView extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  render() {
    return (
      <Page title='Gutenberg' viewer={this.props.viewer}>
        <section className={styles.container}>
          test
        </section>
      </Page>
    );
  }
}

export default createFragmentContainer(withAuth(ProfileView), graphql`
  fragment ProfileView_viewer on Viewer {
    ...Page_viewer
    user {
      firstName
    }
  }
`);
