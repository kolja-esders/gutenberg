import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth/utils';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { Button, Image, Menu, Segment, Header, Form } from 'semantic-ui-react';
import profileImage from '../../../assets/raising_hand_emoji.png';

import styles from './ProfileView.scss';

class ProfileView extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }
  state = { user: { email: this.props.viewer.user.email, firstName: this.props.viewer.user.firstName, lastName: this.props.viewer.user.lastName } }

  handleChange = (e, { value }) => {
    const name = e.target.name;
    const { user } = this.state;
    user[name] = value;
    this.setState({ ...this.state, user })
  }

  render() {
    const { user } = this.state;
    return (
      <Page title='Gutenberg' viewer={this.props.viewer}>
        <section className={styles.container}>
          <Segment padded='very' className={styles.clearfix}>
            <section className={styles.nav}>
              <Menu vertical>
                <Menu.Item name='profile' active>
                  Profile
                </Menu.Item>

                <Menu.Item name='invites'>
                  Invites
                </Menu.Item>
              </Menu>
            </section>
            <section className={styles.content}>
              <Image src={profileImage} className={styles.profileImage} size='small' avatar/>
              <Header as='h1'>Profile</Header>
              <Form className={styles.profileInfo}>
                <Form.Group>
                  <Form.Input placeholder='First name' label='First name' name='firstName' value={user.firstName} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Input placeholder='Last name' label='Last name' name='lastName' value={user.lastName} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Input placeholder='E-Mail' label='E-Mail' name='email' disabled value={user.email} onChange={this.handleChange} />
                </Form.Group>

                <Button color='green'>Save changes</Button>
              </Form>
            </section>
          </Segment>
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
      lastName
      dateJoined
      email
    }
  }
`);
