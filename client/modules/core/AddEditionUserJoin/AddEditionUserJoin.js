import React from 'react';
import Page from 'components/Page/Page';
import DropdownItem from 'components/DropdownItem/DropdownItem'
import { withAuth } from 'modules/auth//utils';
import { Input, Dropdown, Button, Rating, Grid, Segment, Header } from 'semantic-ui-react';
import { graphql, createRefetchContainer } from 'react-relay';
import createBookAndEditionFromGoodreadsMutation from '../mutations/CreateBookAndEditionFromGoodreads';
import createAuthorFromGoodreadsMutation from '../mutations/CreateAuthorFromGoodreads';
import createEditionUserJoinMutation from '../mutations/CreateEditionUserJoin';
import styles from './AddEditionUserJoin.scss';
import URLSearchParams from 'url-search-params';
import AsyncSelect from 'react-select/lib/Async';

export const optionLength = [
  { value: 1, label: 'general' },
  {
    value: 2,
    label:
      'Evil is the moment when I lack the strength to be true to the Good that compels me.',
  },
  {
    value: 3,
    label:
      "It is now an easy matter to spell out the ethic of a truth: 'Do all that you can to persevere in that which exceeds your perseverance. Persevere in the interruption. Seize in your being that which has seized and broken you.",
  },
];

// let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }

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


const CustomOption = ( commonProps ) => {
    console.log(commonProps)
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
    selectedEditionWorkId: '',
    lastSearchInput: '',
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

  handleEditionChange = () => {
  }

    //const editionOptions = responseJson.map(x => ({
      //key: x.workId,
      //value: x.workId,
      //text: x.bookTitleBare,
      //content: <DropdownItem
        //bookImage={x.imageUrl}
        //bookTitle={x.bookTitleBare}
        //bookAuthor={x.author.name}
      ///>
    //}));
    //console.log(editionOptions)
    //this.setState({ ...this.state, editionOptions, editions });


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
    const { user } = this.props.viewer;
    const { selectedState } = this.state;
    const { rating } = this.state.input;
    const edition = this.state.editions.get(this.state.selectedEditionWorkId);

    const authorVariables = {
      nameInput: edition.author.name,
      goodreadsUidInput: edition.author.id
    };
    createAuthorFromGoodreadsMutation(environment, authorVariables, (data, error) => {
      const bookAndEditionVariables = {
        titleInput: edition.bookTitleBare,
        authorIdInput: data.createAuthorFromGoodreads.author.id,
        goodreadsWorkUidInput: edition.workId,
        goodreadsBookUidInput: edition.bookId
      };
      createBookAndEditionFromGoodreadsMutation(environment, bookAndEditionVariables, (data, error) => {
        const userAndEditionVariables = {
          userIdInput: user.id,
          editionIdInput: data.createBookAndEditionFromGoodreads.edition.id,
          stateInput: selectedState,
          ratingInput: selectedState === 'read' ? rating : null
        };
        createEditionUserJoinMutation(environment, userAndEditionVariables, (data, error) => {
          if (!error) {
            this.props.router.push('/');
          }
        }, this.setErrors);
      }, this.setErrors);
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


  renderOption = (option) => {
    console.log(option)
		return (
			<div>test</div>
		);
	}


  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve([{label: 'A', value: 'a'}, {label: 'B', value: 'b'}, {label: 'C', value: 'c'}]);
      }, 1000);
    });

  render() {
    const { input, erros } = this.state;
    const title = 'Add Book to Bookshelf';

    return (
      <Page viewer={this.props.viewer} title={title}>

        <div className={styles.container}>
          <Segment padded='very'>
            <Header as='h1'>New book</Header>

          <form className={styles.form}>

            <AsyncSelect
              loadOptions={this.getAutocompleteSuggestions}
               cacheOptions
               defaultOptions
               components={{ Option: CustomOption }}
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
  graphql`
    fragment AddEditionUserJoin_viewer on Viewer {
      ...Page_viewer
      user {
        id
      }
    }
  `,
);
