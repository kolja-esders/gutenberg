import React from 'react';
import Page from 'components/Page/Page';
import DropdownItem from 'components/DropdownItem/DropdownItem';
import { withAuth } from 'modules/auth//utils';
import URLSearchParams from 'url-search-params';
import { Button, Rating, Segment, Header } from 'semantic-ui-react';
import { graphql, createRefetchContainer } from 'react-relay';
import AsyncSelect from 'react-select/lib/Async';
import createBookAndEditionFromGoodreadsMutation from '../mutations/CreateBookAndEditionFromGoodreads';
import createAuthorFromGoodreadsMutation from '../mutations/CreateAuthorFromGoodreads';
import createEditionUserJoinMutation from '../mutations/CreateEditionUserJoin';
import styles from './AddEditionUserJoin.scss';

const CustomOption = ( commonProps ) => {
    return(
      <div className={styles.option}>
        <DropdownItem
          bookImage={commonProps.data.data.imageUrl}
          bookTitle={commonProps.data.data.title}
          bookAuthor={commonProps.data.data.author.name}
        />
      </div>
    )
}

const customStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
}

class AddEditionUserJoin extends React.Component {
  state = {
    selectedRating: 0,
    selectedState: 'to-read',
    selectedEdition: '',
    errors: []
  }

  getAutocompleteSuggestions = async (searchVal: string) => {
    if (!searchVal) {
      return null;
    }

    const AUTOCOMPLETE_BASE_URL = 'https://www.goodreads.com/book/auto_complete?';
    const PROXY_URL_PREFIX = 'https://cors-anywhere.herokuapp.com/';
    const searchParams = new URLSearchParams('format=json');
    searchParams.set('q', searchVal);
    const queryUrl = PROXY_URL_PREFIX + AUTOCOMPLETE_BASE_URL + searchParams.toString();

    const response = await fetch(queryUrl);
    const json = await response.json();
    return json.map((d) => {
      return {
        value: d.bookId,
        label: d.title,
        data: d
      };
    });
  }

  setErrors = (errors) => {
    this.setState({ ...this.state, errors });
  }

  getErrors(fieldId) {
    const { errors } = this.state;
    if (errors.length > 0) {
      return errors.filter(x => x.key === fieldId);
    }
    return [];
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (!this.state.selectedEdition) {
      // TODO: Push to errors
      return;
    }
    const { environment } = this.props.relay;
    const { user } = this.props.viewer;
    const { selectedState, selectedRating, selectedEdition } = this.state;

    const authorVariables = {
      nameInput: selectedEdition.author.name,
      goodreadsUidInput: selectedEdition.author.id
    };
    createAuthorFromGoodreadsMutation(environment, authorVariables, (data, error) => {
      const bookAndEditionVariables = {
        titleInput: selectedEdition.bookTitleBare,
        authorIdInput: data.createAuthorFromGoodreads.author.id,
        goodreadsWorkUidInput: selectedEdition.workId,
        goodreadsBookUidInput: selectedEdition.bookId
      };
      createBookAndEditionFromGoodreadsMutation(environment, bookAndEditionVariables, (data, error) => {
        const userAndEditionVariables = {
          userIdInput: user.id,
          editionIdInput: data.createBookAndEditionFromGoodreads.edition.id,
          stateInput: selectedState,
          ratingInput: selectedState === 'read' ? selectedRating : null
        };
        createEditionUserJoinMutation(environment, userAndEditionVariables, (data, error) => {
          if (!error) {
            this.props.router.push('/');
          }
        }, this.setErrors);
      }, this.setErrors);
    }, this.setErrors);
  }

  handleEditionChange = (selectedOption) => {
    if (!selectedOption) {
      return;
    }
    this.setState({ ...this.state, selectedEdition: selectedOption.data });
  }

  handleStateChange = (e, data) => {
    e.preventDefault();
    this.setState({ ...this.state, selectedState: data.id });
  }

  handleRatingChange = (e, data) => {
    this.setState({ ...this.state, selectedRating: data.rating });
  }

  render() {
    const title = 'Add Book to Bookshelf';

    return (
      <Page viewer={this.props.viewer} title={title}>
        <div className={styles.container}>
          <Segment padded='very'>
            <Header as='h1'>New book</Header>
            <form className={styles.form}>
              <AsyncSelect
                className={styles.reactSelect}
                classNamePrefix={styles.reactSelect}
                loadOptions={this.getAutocompleteSuggestions}
                cacheOptions
                defaultOptions
                onChange={this.handleEditionChange}
                components={{ Option: CustomOption }}
                styles={customStyles}
              />

              <Button.Group className={styles.readingStatus} widths='3' basic>
                <Button
                  type='state'
                  onClick={this.handleStateChange}
                  active={this.state.selectedState === 'to-read'}
                  id='to-read'
                  className={styles.stateButton}
                >
                  <div className={styles.toReadIcon} />
                  to-read
                </Button>

                <Button
                  type='state'
                  onClick={this.handleStateChange}
                  active={this.state.selectedState === 'reading'}
                  id='reading'
                  className={styles.stateButton}
                >
                  <div className={styles.readingIcon} />
                  reading
                </Button>

                <Button
                  type='state'
                  onClick={this.handleStateChange}
                  active={this.state.selectedState === 'read'}
                  id='read'
                  className={styles.stateButton}
                >
                  <div className={styles.readIcon} />
                  read
                </Button>
              </Button.Group>

              <div className={styles.ratingContainer} hidden={this.state.selectedState !== 'read'}>
                <span>Your rating:</span>
                <Rating
                  maxRating={5}
                  onRate={this.handleRatingChange}
                  className={styles.rating}
                  size='huge'
                  id='rating'
                />
              </div>

              <Button
                color='green'
                fluid
                type='submit'
                size='huge'
                onClick={this.handleSubmit}
                className='button_submit-add-books-form'
              >
                Add book
              </Button>
            </form>
          </Segment>
        </div>
      </Page>
    );
  }
}

export default createRefetchContainer(
  withAuth(AddEditionUserJoin),
  graphql`
    fragment AddEditionUserJoin_viewer on Viewer {
      ...Page_viewer
      user {
        id
      }
    }
  `,
);
