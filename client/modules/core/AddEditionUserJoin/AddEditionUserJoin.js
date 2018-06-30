import React from 'react';
import Page from 'components/Page/Page';
import DropdownItem from 'components/DropdownItem/DropdownItem'
import { withAuth } from 'modules/auth//utils';
import { Input, Dropdown, Button, Rating, Grid, Segment, Header } from 'semantic-ui-react';
import { graphql, createRefetchContainer } from 'react-relay';
import createBookAndEditionFromGoodreadsMutation from '../mutations/CreateBookAndEditionFromGoodreads';
import createEditionUserJoinMutation from '../mutations/CreateEditionUserJoin';
import styles from './AddEditionUserJoin.scss';
import URLSearchParams from 'url-search-params'


const stateOptions = [{ key: 'toread', value: 'toread', text: 'to read' },
                        { key: 'read', value: 'read', text: 'read' },
                        { key: 'reading', value: 'reading', text: 'reading' },
];

const ratingOptions = [{ key: 1, value: 1, text: '1' },
                        { key: 2, value: 2, text: '2' },
                        { key: 3, value: 3, text: '3' },
                        { key: 4, value: 4, text: '4' },
                        { key: 5, value: 5, text: '5' },
];

class AddEditionUserJoin extends React.Component {
  state = {
    input: {
      title: '',
      author: '',
      state: 'to-read',
      rating: 0
    },
    selectedState: 'to-read',
    errors: [],
    editions: new Map(),
    editionOptions: [],
    selectedEditionWorkId: ''
  }

  handleEditionSearchTextChange = async (e, data) => {
    // Trigger first fetch only when there are at least three characters.
    if (data.length < 3) {
      return;
    }

    const AUTOCOMPLETE_BASE_URL = 'https://www.goodreads.com/book/auto_complete?';
    const PROXY_URL_PREFIX = 'https://cors-anywhere.herokuapp.com/';
    const searchParams = new URLSearchParams('format=json');
    searchParams.set('q', data);

    const queryUrl = PROXY_URL_PREFIX + AUTOCOMPLETE_BASE_URL + searchParams.toString();

    const response = await fetch(queryUrl);
    const responseJson = await response.json();

    const editions = new Map();
    for (const x of responseJson) {
      editions.set(x.workId, x);
    }

    const editionOptions = responseJson.map(x => ({
      key: x.workId,
      value: x.workId,
      text: x.bookTitleBare,
      content: <DropdownItem
        bookImage={x.imageUrl}
        bookTitle={x.bookTitleBare}
        bookAuthor={x.author.name}
        onClick={this.handleDropdownSelection}
      />
    }));

    this.setState({ ...this.state, editionOptions, editions });
  }

  handleEditionChange = (_, data) => {
    this.setState({ ...this.state, selectedEditionWorkId: data.value });
  }

  handleStateChange = (e, data) => {
    e.preventDefault();
    const input = this.state.input;
    const inputName = data.type;
    input[inputName] = data.id;
    this.setState({ ...this.state, input, selectedState: data.id });
  }

  handleRatingChange = (e, data) => {
    const input = this.state.input;
    const inputName = data.id;
    input[inputName] = data.rating;
    this.setState({ ...this.state, input });
  }

  setErrors = (errors) => {
    this.setState({ ...this.state, errors });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (!this.state.editions.has(this.state.selectedEditionWorkId)) {
      // TODO: Push to errors
      console.log('No edition has been selected');
      return;
    }
    const { environment } = this.props.relay;
    const edition = this.state.editions.get(this.state.selectedEditionWorkId);

    // TODO: Check (maybe based on platform workId for now) whether book already exists.
    const variables = {
      titleInput: edition.bookTitleBare,
      authorIdInput: '',
      goodreadsWorkUidInput: edition.workId,
      goodreadsBookUidInput: edition.bookId
    };
    createBookAndEditionFromGoodreadsMutation(environment, variables, (error, data) => {
      console.log(error, data);
    }, this.setErrors);
  }

  onCompletedCreateEdition = (error, data) => {
    const refetchVariables = fragmentVariables => ({
      title: this.state.input.title,
      author: this.state.input.author,
      input: this.state.input.title
    });
    this.props.relay.refetch(refetchVariables, null, this.onCompletedRefetch);
  }

  onCompletedRefetch = (error) => {
    if (error) {
      console.error(error);
      return;
    }

    let { rating, state } = this.state.input;
    const { book, user } = this.props.viewer;

    if (state != "read") {
      rating = 0;
      const input = this.state.input;
      input["rating"] = rating;
      this.setState({ ...this.state, input });
    }

    const variables = {
      userIdInput: user.id,
      bookIdInput: book.id,
      ratingInput: rating,
      stateInput: state
    };

    //const variables = {
      //title: user.id,
      //goodreadsAuthorUid: user.id,
      //goodreadsBookUid: book.id,
      //goodreadsWorkUid: rating,
    //};

    //createAuthorFromGoodreads(this.props.relay.environment, variables, this.onCompletedEditionUserJoin, this.setErrors);

    //createBookAndEditionFromGoodreads(this.props.relay.environment, variables, this.onCompletedEditionUserJoin, this.setErrors);

    createEditionUserJoinMutation(this.props.relay.environment, variables, this.onCompletedEditionUserJoin, this.setErrors);
  }

  onCompletedEditionUserJoin = (error, data) => {
    this.props.router.push("/")
  }

  getErrors(fieldId) {
    const { errors } = this.state;
    if (errors.length > 0) {
      return errors.filter(x => x.key === fieldId);
    }
    return [];
  }


  render() {
    const { input, erros } = this.state;
    const title = 'Add Book to Bookshelf';

    return (
      <Page viewer={this.props.viewer} title={title}>

        <div className={styles.container}>
          <Segment padded='very'>
            <Header as='h1'>New book</Header>

          <form className={styles.form}>

            <Dropdown
                 id="title"
                 className={styles.nameField}
                 options={this.state.editionOptions}
                 selection
                 search
                 placeholder='E.g. "Harry Potter"'
                 onSearchChange={this.handleEditionSearchTextChange}
                 onChange={this.handleEditionChange}
               />


          <Button.Group className={styles.readingStatus} widths='3' basic>
              <Button type='state'
                onClick={this.handleStateChange}
                active={this.state.selectedState == "to-read"}
                id="to-read"
                className={styles.stateButton}>
                <div className={styles.toReadIcon} />
                to-read
              </Button>

              <Button type='state'
                onClick={this.handleStateChange}
                active={this.state.selectedState == "reading"}
                id="reading"
                className={styles.stateButton}>
                <div className={styles.readingIcon} />
                reading
              </Button>

              <Button type='state'
                onClick={this.handleStateChange}
                active={this.state.selectedState == "read"}
                id="read"
                className={styles.stateButton}>
                <div className={styles.readIcon} />
                read
              </Button>
            </Button.Group>

            <div className={styles.ratingContainer} hidden={this.state.selectedState != "read"}>
              <span>Your rating:</span>
              <Rating maxRating={5}
                onRate={this.handleRatingChange}
                className={styles.rating}
                size='huge'
                id = 'rating'/>
            </div>

           <Button
             color='green'
              fluid
              type='submit'
              size='huge'
              onClick = {this.handleSubmit}
              className='button_submit-add-books-form'
            >
              Add book
            </Button>

          </form>
        </Segment>
            </div>
          </Page>
        )

      }
}

export default createRefetchContainer(
  withAuth(AddEditionUserJoin),
  {
    viewer: graphql`
      fragment AddEditionUserJoin_viewer on Viewer
      @argumentDefinitions(
        title: {type: "String"},
        author: {type: "String"},
        input: {type: "String"}
      ) {
        ...Page_viewer
        book(title: $title, author: $author) {
          id
        }
        user {
          id
        }
      }
    `,
    user: graphql`
     fragment AddEditionUserJoin_user on Viewer {
          user {
           id
         }
       }
    `,
  },
  graphql`
    query AddEditionUserJoinRefetchQuery($title: String!, $author: String!, $input: String!){
      viewer {
        ...AddEditionUserJoin_viewer @arguments(title: $title, author: $author, input: $input)
        ...AddEditionUserJoin_user
      }
    }
  `,
);
