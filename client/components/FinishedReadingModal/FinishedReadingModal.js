import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Rating, Button, Icon, Modal, Popup } from 'semantic-ui-react';
import styles from './FinishedReadingModal.scss';
import updateRatingMutation from '../../modules/core/mutations/UpdateRating';
import updateStateMutation from '../../modules/core/mutations/UpdateState';

class FinishedReadingModal extends React.Component {

  state = {
    input: { rating: 0, state: '' },
    errors: [],
    modalOpen: false,
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  handleRatingChange = (e, data) => {
    e.preventDefault();
    const input = this.state.input;
    const inputName = 'rating';
    input[inputName] = data.rating;
    this.setState({ ...this.state, input });
  }

  onCompletedModal = (state) => {
    const input = this.state.input;
    input.state = state;
    this.setState({ ...this.state, input });

    const variables = {
      editionUserJoinId: this.props.id,
      rating: this.state.input.rating
    };
    updateRatingMutation(this.props.relay.environment, variables, this.onCompletedUpdateRatingMutation, this.setErrors)
  }

  onCompletedUpdateRatingMutation = (error, data) => {
    const variables = {
      editionUserJoinId: this.props.id,
      state: this.state.input.state
    };
    updateStateMutation(this.props.relay.environment, variables, this.onCompletedUpdateStateMutation, this.setErrors);
  }

  render() {
    return (
      <div>
        <Popup
          trigger={
              <Button icon floated="right" onClick={() => this.openModal()}>
                <Icon name="check circle" size="large"/>
              </Button>}
          content="Mark as read"
        />

        <Modal
          size="mini" open={this.state.modalOpen}
          onClose={this.close}
          className={styles.modal}>

        <Modal.Header>
          How did you like {this.props.title}?
        </Modal.Header>
        <Modal.Content>
          <div className={styles.ratingModal}>
            <Rating
              size="huge"
              defaultRating={this.props.rating}
              maxRating={5}
              id ={this.props.id}
              onRate={this.handleRatingChange}
            />
          </div>


        </Modal.Content>
        <Modal.Actions>
          <Button basic onClick={() => this.closeModal()}>
            Cancel
          </Button>
          <Button positive icon='checkmark'
            content='Done'
            onClick = {() => this.onCompletedModal("read")}
          />
        </Modal.Actions>
      </Modal>
      </div>
    )
  }
}

export default createFragmentContainer(
  FinishedReadingModal,
  graphql`
    fragment FinishedReadingModal_editions on EditionUserJoinConnection {
      edges{
        node{
          id
        }
      }
    }
  `
);
