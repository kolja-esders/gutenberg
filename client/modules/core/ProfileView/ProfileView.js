import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth/utils';
import React from 'react';
import { createFragmentContainer, graphql, commitMutation } from 'react-relay';
import { DragDropContext, DragDropContextProvider } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import { Label, Modal, Icon, Button, Image, Menu, Segment, Header, Form } from 'semantic-ui-react';
import DropTargetArea from 'components/DropTargetArea/DropTargetArea';
import profileImage from '../../../assets/raising_hand_emoji.png';

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

@DragDropContext(HTML5Backend)
class ProfileView extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }
  state = { user: { email: this.props.viewer.user.email, firstName: this.props.viewer.user.firstName, lastName: this.props.viewer.user.lastName }, droppedFiles: [], success: false }

  handleChange = (e, { value }) => {
    const name = e.target.name;
    const { user } = this.state;
    user[name] = value;
    this.setState({ ...this.state, user });
  }

  handleSave = (e) => {
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

  handleFileDrop = (item, monitor) => {
    if (monitor) {
      const droppedFiles = monitor.getItem().files;
      this.setState({ ...this.state, droppedFiles });
    }
  }

  render() {
    const { user } = this.state;
    const { FILE } = NativeTypes;

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
                    <DragDropContextProvider backend={HTML5Backend}>
                      <div>
                      <DropTargetArea accepts={[FILE]} onDrop={this.handleFileDrop} />
                      <Button className={styles.saveImage} color='green'>Update image</Button>
                      </div>
                    </DragDropContextProvider>
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
    }
  }
`);
