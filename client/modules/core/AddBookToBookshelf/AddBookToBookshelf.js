import React from 'react';
import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth//utils';
import { Input, Dropdown, Button, Rating, Grid, Segment, Header } from 'semantic-ui-react';
import { graphql, createRefetchContainer } from 'react-relay';
import createBookMutation from '../mutations/CreateBook';
import createBookshelfEntryMutation from '../mutations/CreateBookshelfEntry';
import styles from './AddBookToBookshelf.scss';
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


function validateInput(input) {
  let errors = [];
  let id = 0;

  input = { ...input };

  if (!input.title) {
    id++;
    errors.push({
      id,
      key: '',
      message: 'Please fill out the title field'
    });
  }
  if (!input.author) {
    id++;
    errors.push({
      id,
      key: '',
      message: 'Please fill out the author field'
    });
  }
  // if (!input.state) {
  //   id++;
  //   errors.push({
  //     id,
  //     key: '',
  //     message: 'Please choose a state'
  //   });
  // }
  // if (!input.rating) {
  // id++;
  // errors.push({
  //   id,
  //   key: '',
  //   message: 'Please choose a rating'
  // });
  // }
  if (errors.length === 0) {
   // Empty array will still return true
    errors = false;
  }
  return { input, errors };
}

class AddBookToBookshelf extends React.Component {
  state = { input: { title: '', author: '', state: 'to-read', rating: 0 }, active: 'to-read', matchAuthors: {key: {title: '', author: ''}}, errors: [] }

  handleTitleFieldChange = (e, { value }) => {
    const input = this.state.input;
    const inputName = e.target.id;
    input[inputName] = e.target.value;
    this.setState({ ...this.state, input });

    if (this.state.input.title.length >= 3) {
      const refetchVariables = fragmentVariables => ({
        title: " ",
        author: " ",
        input: this.state.input.title
      });

      this.props.relay.refetch(refetchVariables, null, this.autoComplete);
    }

  }


  handleFieldChange = (e, { value }) => {
    const input = this.state.input;
    const inputName = e.target.id;
    input[inputName] = e.target.value;
    this.setState({ ...this.state, input });

  }

  handleTitleDropdownChange = (e, data) => {
    const input = this.state.input;
    const inputName = "title";
    input[inputName] = data;
    this.setState({ ...this.state, input });

    if (this.state.input.title.length >= 3) {
      const refetchVariables = fragmentVariables => ({
        title: " ",
        author: " ",
        input: this.state.input.title
      });
      this.props.relay.refetch(refetchVariables, null, this.autoComplete);
  }
  }
  handleAuthorDropdownChange = (e, data) => {
    const input = this.state.input;
    const inputName = "author";
    input[inputName] = data.value;
    this.setState({ ...this.state, input });
  }


  handleDropdownFinalChange = (e, data) => {
    console.log(data)
    console.log(this.props.viewer)
    const input = this.state.input;

    input["author"] = this.state.matchAuthors[data.value].author;
    input["title"] = this.state.matchAuthors[data.value].title;
    this.setState({ ...this.state, input });
  }

  handleButtonChange = (e, data) => {
    e.preventDefault();
    const input = this.state.input;
    const inputName = data.type;
    input[inputName] = data.id;
    this.setState({ ...this.state, input });
    this.setState({ ...this.state, active: data.id });
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


  onCompletedSubmit = (ev) => {
    ev.preventDefault();
    console.log("onCompleted")
    const { input, errors } = validateInput(this.state.input);
    if (errors) {
      this.setErrors(errors);
      return;
    }

    //Check if book already exists
    const refetchVariables = fragmentVariables => ({
      title: input.title,
      author: input.author,
      input: input.title
    });


    this.props.relay.refetch(refetchVariables, null, this.checkIfBookExists);
  }

  checkIfBookExists = (error) => {
    if(this.props.viewer.book == null){
      const variables = {
        titleInput: this.state.input.title,
        authorInput: this.state.input.author,
      };
      createBookMutation(this.props.relay.environment, variables, this.onCompletedCreateBook, this.setErrors);

    } else {
      console.log("book already exists")
      this.onCompletedRefetch();
    }
  }

  onCompletedCreateBook = (error, data) => {
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
    console.log("CompletedRefetch")


    var { rating, state } = this.state.input;
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
    console.log(variables)
    console.log("create")
    createBookshelfEntryMutation(this.props.relay.environment, variables, this.onCompletedBookshelfEntry, this.setErrors);
  }

  onCompletedBookshelfEntry = (error, data) => {
    this.props.router.push("/")
  }

  getErrors(fieldId) {
    const { errors } = this.state;
    if (errors.length > 0) {
      return errors.filter(x => x.key === fieldId);
    }
    return [];
  }


  autoComplete = () => {
    console.log("autoComplete")

    // Fetch data from Goodreads
    // const url = new URL('https://www.goodreads.com/book/auto_complete?format=json&q=dan+ariely')
    // const url = new URL('https://www.goodreads.com/book/auto_complete');
    let baseurl = 'https://www.goodreads.com/book/auto_complete?';
    const params = new URLSearchParams('format=json');
    params.set('q', this.state.input.title);
    let finalurl = baseurl.concat(params.toString());
    let proxyurl = 'https://cors-anywhere.herokuapp.com/';

    console.log("Param>3");
    console.log(finalurl);
    console.log(params.toString());
    console.log(proxyurl + finalurl);

    fetch(proxyurl + finalurl)
    .then(response => response.text())
    .then(contents => console.log(contents))
    .catch(() => console.log("Can't access " + finalurl + "response. Blocked?"))

    const bookOptions = this.props.viewer.booksAutocompleted.map((x) => ({key: x.id, value: x.id, text: x.title+" by "+x.author}))

    for (var i=0; i < this.props.viewer.booksAutocompleted.length; i++){
      const matchAuthors = this.state.matchAuthors;
      const key = this.props.viewer.booksAutocompleted[i].id;
      matchAuthors[key] = this.props.viewer.booksAutocompleted[i];

      this.setState({ ...this.state, matchAuthors});
    };
    this.setState({ ...this.state, bookOptions });


  }


  render() {

    const { input, erros } = this.state;
    const title = 'Add Book to Bookshelf';

    return (
      <Page viewer={this.props.viewer} title={title}>
        <div className={styles.container}>
          <Segment padded='very'>
            <Header as='h1'>New book</Header>

          <form
              className={styles.form}
            >

            <Dropdown
                 id="title"
                 className={styles.nameField}
                 options={this.state.bookOptions}
                 search
                 selection
                 fluid
                 onSearchChange={this.handleTitleDropdownChange}
                 onChange={this.handleDropdownFinalChange}
                 placeholder='book title'
               />



          <Button.Group className={styles.readingStatus} widths='3' basic>
              <Button type='state'
                onClick={this.handleButtonChange}
                active={this.state.active == "to-read"}
                id="to-read"
                className={styles.stateButton}>
                <div className={styles.toReadIcon} />
                to-read
              </Button>

              <Button type='state'
                onClick={this.handleButtonChange}
                active={this.state.active == "reading"}
                id="reading"
                className={styles.stateButton}>
                <div className={styles.readingIcon} />
                reading
              </Button>

              <Button type='state'
                onClick={this.handleButtonChange}
                active={this.state.active == "read"}
                id="read"
                className={styles.stateButton}>
                <div className={styles.readIcon} />
                read
              </Button>
            </Button.Group>

            <div className={styles.ratingContainer} hidden={this.state.active != "read"}>
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
              onClick = {this.onCompletedSubmit}
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
  withAuth(AddBookToBookshelf),
  {
    viewer: graphql`
      fragment AddBookToBookshelf_viewer on Viewer
      @argumentDefinitions(
        title: {type: "String"},
        author: {type: "String"},
        input: {type: "String"}
      ){
        ...Page_viewer
        book(title: $title, author: $author) {
          id
        }
        user{
          id
        }

        booksAutocompleted(title: $input){
          id
          title
          author
        }
      }
      `,

    user: graphql`
     fragment AddBookToBookshelf_user on Viewer {
          user{
           id
         }
       }
    `,
  },


  graphql`
    query AddBookToBookshelfRefetchQuery($title: String!, $author: String!, $input: String!){
      viewer {
        ...AddBookToBookshelf_viewer @arguments(title: $title, author: $author, input: $input)
        ...AddBookToBookshelf_user

      }
    }
    `,
);
