/* eslint-disable jsx-a11y/href-no-hash */
import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth/utils';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { Button, Input, Icon } from 'semantic-ui-react';

import styles from './AcceptInviteView.scss';

class AcceptInviteView extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  onChangeHandler = (ev, { value }) => {
  }

  onSubmitHandler = (ev) => {
    ev.preventDefault();
  }

  render() {
    const group = this.props.viewer.group;
    return (
      <Page title='Gutenberg' viewer={this.props.viewer} activeGroup={group.name}>
        <section className={styles.container}>
          <form className={styles.createForm} onSubmit={this.onSubmitHandler}>
            <Input className={styles.friendEmailInput} placeholder='john@doe.com' size='massive' onChange={this.onChangeHandler} />
            <Input className={styles.friendEmailInput} placeholder='john@doe.com' size='massive' onChange={this.onChangeHandler} />
            <Input className={styles.friendEmailInput} placeholder='john@doe.com' size='massive' onChange={this.onChangeHandler} />

            <Button className={styles.submitButton} type='submit' size='massive' primary fluid><Icon name='send' />Send invites</Button>
          </form>
        </section>
      </Page>
    );
  }
}

export default createFragmentContainer(withAuth(GroupInviteView), graphql`
    fragment GroupInviteView_viewer on Viewer {
      ...Page_viewer
      group(nameUrl: $nameUrl) {
        name
      }
    }
  `);
