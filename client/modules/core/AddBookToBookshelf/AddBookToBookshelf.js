import React from 'react';
import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth//utils';
import { Input, Dropdown, Button, Rating, Grid } from 'semantic-ui-react';
import { graphql, createRefetchContainer } from 'react-relay';
import createBookMutation from '../mutations/CreateBook';
import createBookshelfEntryMutation from '../mutations/CreateBookshelfEntry';
import styles from './AddBookToBookshelf.scss';


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
  if (!input.state) {
    id++;
    errors.push({
      id,
      key: '',
      message: 'Please choose a state'
    });
  }
  if (!input.rating) {
    id++;
    errors.push({
      id,
      key: '',
      message: 'Please choose a rating'
    });
  }
  if (errors.length === 0) {
   // Empty array will still return true
    errors = false;
  }
  return { input, errors };
}

class AddBookToBookshelf extends React.Component {

  constructor(props) {
    super(props);
    const initialInput = {
      title: '',
      author: '',
      state: '',
      rating: ''
    };
    this.state = {
      input: initialInput,
      errors: []
    };
  }


  handleFieldChange = (e, { value }) => {
    const input = this.state.input;
    const inputName = e.target.id;
    input[inputName] = e.target.value;
    this.setState({ input });
  }

  handleDropdownChange = (e, data) => {
    const input = this.state.input;
    const inputName = data.id;
    input[inputName] = data.value;
    this.setState({ input });
  }


  handleButtonChange = (e, data) => {
    e.preventDefault();
    const input = this.state.input;
    const inputName = data.type;
    input[inputName] = data.id;
    this.setState({ input });
    this.setState({ active: data.id });
  }

  handleRatingChange = (e, data) => {
    const input = this.state.input;
    const inputName = data.id;
    input[inputName] = data.rating;
    this.setState({ input });
  }


  setErrors = (errors) => {
    this.setState({ errors });
  }


  onCompletedSubmit = (ev) => {
    ev.preventDefault();
    const { input, errors } = validateInput(this.state.input);
    if (errors) {
      this.setErrors(errors);
      return;
    }

    const variables = {
      titleInput: input.title,
      authorInput: input.author
    };

    createBookMutation(this.props.relay.environment, variables, this.onCompletedCreateBook, this.setErrors);
  }

  onCompletedCreateBook = (error, data) => {
    const refetchVariables = fragmentVariables => ({
      title: this.state.input.title,
      author: this.state.input.author
    });
    this.props.relay.refetch(refetchVariables, null, this.onCompletedRefetch);
  }

  onCompletedRefetch = (error) => {
    if (error) {
      console.error(error);
      return;
    }
    const { rating, state } = this.state.input;
    const { book, user } = this.props.viewer;

    const variables = {
      userIdInput: user.id,
      bookIdInput: book.id,
      ratingInput: rating,
      stateInput: state
    };
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


  render() {
    const { input, erros } = this.state;
    const title = 'Add Book to Bookshelf';

    return (
      <Page viewer={this.props.viewer} title={title}>
        <div className={styles.container}>

          <form
            className={styles.form}
          >


            <Input
              id='title'
              className={styles.nameField}
              onChange={this.handleFieldChange}
              value={input.title}
              type='text'
              size='large'
              fluid
              required
              placeholder='book title'
            />

            <Input
              id='author'
              className={styles.nameField}
              onChange={this.handleFieldChange}
              value={input.author}
              type='text'
              size='large'
              fluid
              required
              placeholder='author'
            />

            <Grid>
              <Grid.Column floated='left' width={5}>
                Rating
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Rating maxRating={5}
                  onRate={this.handleRatingChange}
                  id = 'rating'/>
              </Grid.Column>
            </Grid>





            <Button.Group className={styles.readingStatus}>
              <Button type='state'
                onClick={this.handleButtonChange}
                active={this.state.active == "read"}
                id="read"
                className={styles.stateButton}>
                <div className={styles.readIcon} />
                read
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
                active={this.state.active == "to-read"}
                id="to-read"
                className={styles.stateButton}>
                <div className={styles.toReadIcon} />
                to-read
              </Button>
            </Button.Group>


            <Button
              primary
              fluid
              type='submit'
              size='large'
              onClick = {this.onCompletedSubmit}
              className='button_submit-add-books-form'
            >
              Add book
            </Button>


          </form>
        </div>
      </Page>
    );
  }


}

export default createRefetchContainer(
  withAuth(AddBookToBookshelf),

  {
    viewer: graphql`
      fragment AddBookToBookshelf_viewer on Viewer
      @argumentDefinitions(
        title: {type: "String"},
        author: {type: "String"}
      ){
        ...Page_viewer
        book(title: $title, author: $author) {
          id
        }
        user{
          id
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
    query AddBookToBookshelfRefetchQuery($title: String!, $author: String!){
      viewer {
        ...AddBookToBookshelf_viewer @arguments(title: $title, author: $author)
        ...AddBookToBookshelf_user
      }
    }
    `,


);

/*
graphql`
  query AddBookToBookshelfQuery{
    viewer{
        ...AddBookToBookshelf_user
      }
  }
`,
*/

/*
user: graphql.experimental`
 fragment AddBookToBookshelf_user on Viewer {
     viewer{
       id
     }
   }
`,*/

/*
export default createFragmentContainer(
  authenticatedRoute(AddBookToBookshelf),
  graphql`
   fragment AddBookToBookshelf_viewer on Viewer {
     user {
       id
     }
   }

 `,


 graphql`
  fragment AddBookToBookshelf_book on Viewer {
      book(title: $titleInput, author: $authorInput){
      id
    }
  }

`

)
*/
