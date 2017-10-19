import React from 'react'
import styles from './AddBookToBookshelf.scss'
import Page from 'components/Page/Page'
// TODO
//import CreateBookshelfEntryMutation from '../mutations/CreateBookshelfEntry'
import CreateBookMutation from '../mutations/CreateBook'
import FormMessageList from 'components/FormMessageList/FormMessageList'
import { authenticatedRoute } from 'modules/auth//utils'
import { graphql, createFragmentContainer, createRefetchContainer } from 'react-relay';

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
import { Input, Dropdown, Button } from 'semantic-ui-react';


 const stateOptions = [ { key: 'toread', value: 'toread', text: 'to read' },
                        { key: 'read', value: 'read', text: 'read' },
                        { key: 'reading', value: 'reading', text: 'reading' },
                      ]

const ratingOptions = [ { key: 1, value: 1, text: '1' },
                        { key: 2, value: 2, text: '2' },
                        { key: 3, value: 3, text: '3' },
                        { key: 4, value: 4, text: '4' },
                        { key: 5, value: 5, text: '5' },
                     ]


function validateInput(input) {
console.log("in validateInput")
 let errors = []
 let id = 0

 input = { ...input }

 if (!input.title) {
   id++
   errors.push({
     id,
     key: '',
     message: 'Please fill out the title field'
   })
 }
 if (!input.author) {
   id++
   errors.push({
     id,
     key: '',
     message: 'Please fill out the author field'
   })
 }
 if (!input.state) {
   id++
   errors.push({
     id,
     key: '',
     message: 'Please choose a state'
   })
 }
 if (!input.rating) {
   id++
   errors.push({
     id,
     key: '',
     message: 'Please choose a rating'
   })
 }
 if (errors.length === 0) {
   // Empty array will still return true
   errors = false

 }
 return { input, errors }
}

class AddBookToBookshelf extends React.Component{

  constructor(props){
    super(props)
    const initialInput = {
      title: '',
      author: '',
      state: '',
      rating: ''
    }
      this.state = {
        input: initialInput,
        errors: []
      }
    }


      handleFieldChange(e) {
        const input = this.state.input
        const inputName = e.target.id
        input[inputName] = e.target.value
        this.setState({ input })
      }

      setErrors = (errors) => {
        this.setState({ errors })
      }


      submitForm = (form) => {
        form.preventDefault()

        //console.log(this.props.viewer.book)






        console.log("in submitForm")
        const { input, errors } = validateInput(this.state.input)
        //const { environment, router } = this.props

        // const titleInput = input.title
        // const authorInput = input.author

        console.log(this.state.input.title)
        console.log(this.state.input.author)

        const refetchVariables = fragmentVariables => ({
          title: this.state.input.title,
          author: this.state.input.author
        });
        this.props.relay.refetch(refetchVariables, null)

        console.log(this.state.input.title)
        console.log(this.state.input.author)

        // Only when clicking twice on submit the book_id is available
        const book_id = this.props.viewer.book
        console.log(book_id)
        console.log(this.props.viewer.book)
        console.log(this.props.viewer)

        // user_id doesn't work
        //const user_id = this.props.user.user.id
        //console.log(user_id)

        if (!errors) {
          delete input['rating']
          delete input['state']
          console.log(input)
          console.log("submitForm -> no errors")
          CreateBookMutation(environment, this.setErrors.bind(this), input)
<<<<<<< Updated upstream
=======


          //TODO: add userID and bookID
          //CreateBookshelfEntryMutation(environment, this.setErrors.bind(this), input, user_id)
>>>>>>> Stashed changes
        }
        else {
          console.log("errors")
          console.log(errors)
          this.setErrors(errors)
        }
      }


      getErrors(fieldId) {
        const { errors } = this.state
        if (errors.length > 0) {
          return errors.filter(x => x.key === fieldId)
        }
        else return []
      }


      render(){
<<<<<<< Updated upstream
=======
        //console.log("viewer")
        //console.log(this.props.viewer)
        //console.log("user")
        //console.log(this.props.user)
>>>>>>> Stashed changes
        const{ input, erros } = this.state
        const title = 'Add Book to Bookshelf'

        return(
          <Page title={title}>
          <div className={styles.container}>

            <form
              onSubmit={this.submitForm.bind(this)}
              className={styles.form}
            >


            <Input
                id='title'
                className={styles.nameField}
                onChange={this.handleFieldChange.bind(this)}
                value={input.title}
                type='text'
                size="large"
                fluid
                required
                placeholder='book title' />

            <br />

              <Input
                id='author'
                className={styles.nameField}
                onChange={this.handleFieldChange.bind(this)}
                value={input.author}
                type='text'
                size="large"
                fluid
                required
                placeholder='author' />

            <br />
            <Dropdown
                 id='rating'
                 className={styles.dropDown}


                 placeholder='rating'
                 fluid
                 required
                 search selection options={ratingOptions}
             />

             <Dropdown
                 id='state'
                 className={styles.dropDown}


                 placeholder='state'
                 fluid
<<<<<<< Updated upstream

=======
                 required
>>>>>>> Stashed changes
                 search selection options={stateOptions}
             />



            <Button
              primary
              fluid
              type="submit"
              size="large"
              className='button_submit-add-books-form'
            >
              Submit
            </Button>


              </form>
            </div>
          </Page>
        )

    }

/*      const refetchVariables = fragmentVariables => ({
        title: fragmentVariables.input.title,
        author: fragmentVariables.input.author
      });*/
    loadMore(e){
      console.log("loadMore")
      console.log(this.props.viewer.book)

      const refetchVariables = fragmentVariables => ({
        title: this.state.input.title,
        author: this.state.input.author
      });
      this.props.relay.refetch(refetchVariables, null)
    }
}

export default createRefetchContainer(
  authenticatedRoute(AddBookToBookshelf),
  {
    viewer: graphql.experimental`
      fragment AddBookToBookshelf_viewer on Viewer
      @argumentDefinitions(
        title: {type: "String"},
        author: {type: "String"}
      ){
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

  graphql.experimental`
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
