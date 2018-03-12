import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth/utils';
import React from 'react';
import { createFragmentContainer, graphql, commitMutation } from 'react-relay';
import PropTypes from 'prop-types';
import { Label, Modal, Icon, Button, Image, Menu, Segment, Header, Form } from 'semantic-ui-react';
import Dropzone from 'react-dropzone'
import { hasValidJwtToken } from 'modules/auth/jwtUtils';

import styles from './ProfileView.scss';

const UpdateUserMutation = graphql`
  mutation ProfileView_UpdateUser_Mutation(
    $userIdInput: ID!, $firstNameInput: String!, $lastNameInput: String!
  ) {
    updateUser(userId: $userIdInput, firstName: $firstNameInput, lastName: $lastNameInput) {
      user {
        id
      }
    }
  }
`;

class ProfileView extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }
  state = { user: { email: this.props.viewer.user.email, firstName: this.props.viewer.user.firstName, lastName: this.props.viewer.user.lastName }, droppedFiles: [], success: false, accept: '', files: [], dropzoneActive: false, uploading: false }

  handleChange = (e, { value }) => {
    const name = e.target.name;
    const { user } = this.state;
    user[name] = value;
    this.setState({ ...this.state, user });
  }

  handleSave = () => {
    const { user } = this.props.viewer;
    const variables = {
      userIdInput: user.id,
      firstNameInput: this.state.user.firstName,
      lastNameInput: this.state.user.lastName
    };

    commitMutation(this.props.relay.environment, {
      mutation: UpdateUserMutation,
      variables,
      onCompleted: () => {
        if (this.state.success) {
          return;
        }
        this.setState({ ...this.state, success: true });
        setTimeout(() => {
          this.setState({ ...this.state, success: false });
        }, 2000);
      }
    });
  }

  onDragEnter = () => {
    this.setState({ ...this.state, dropzoneActive: true });
  }

  onDragLeave = () => {
    this.setState({ ...this.state, dropzoneActive: false });
  }

  onDrop = (files) => {
    this.setState({ ...this.state, files });
  }

  handleProfileImageSave = () => {
    const file = this.state.files[0];
    window.URL.revokeObjectURL(file.preview);

    const data = new FormData();
    data.append('file', file);
    fetch('/upload', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${hasValidJwtToken().token}`,
      },
      body: data
    }).then(res => {
      this.setState({ ...this.state, uploading: false })
      // TODO(kolja): Fix this
      window.location.reload()
    });
    this.setState({ ...this.state, uploading: true })
  }

  render() {
    const { user } = this.state;
    const dbUser = this.props.viewer.user;
    const profileImage = require(`../../../assets/${dbUser.profileImage}`);

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
                  Open Invites
                  <Label>0</Label>
                </Menu.Item>
              </Menu>
            </section>
            <section className={styles.content}>
              <div className={styles.overlayContainer}>
                <Image src={profileImage} className={styles.profileImage} size='small' avatar />
                <Modal
                  size='small'
                  dimmer='blurring'
                  trigger={
                    <div className={styles.overlayWrap}>
                      <Icon name='write' size='huge' />
                    </div>
                  }
                >
                  <Modal.Header>Change Image</Modal.Header>
                  <Modal.Content>
                    <div className={styles.clearfix}>
                      <Dropzone
                        accept='image/jpeg,image/png'
                        multiple={false}
                        onDrop={this.onDrop}
                        onDragEnter={this.onDragEnter}
                        onDragLeave={this.onDragLeave}
                        className={styles.dropzone}
                      >
                        { this.state.files.length > 0 ?
                          <img width='200' className={styles.profileImagePreview} alt='Profile preview' src={this.state.files[0].preview} />
                        :
                        this.state.dropzoneActive ? 'Release to drop' : 'Click or drop image here' }
                      </Dropzone>
                      <Button className={styles.saveImage} onClick={this.handleProfileImageSave} color='green' loading={this.state.uploading}>Update image</Button>
                    </div>
                  </Modal.Content>
                </Modal>
              </div>
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
                { this.state.success ?
                  <Button color='green'>
                    <Icon name='check' />Changes saved
                  </Button>
                :
                  <Button onClick={this.handleSave} color='green'>Save changes</Button>
                }
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
      id
      firstName
      lastName
      dateJoined
      email
      profileImage
    }
  }
`);
