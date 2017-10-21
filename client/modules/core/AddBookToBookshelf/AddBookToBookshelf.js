import React from 'react'
import styles from './AddBookToBookshelf.scss'
import Page from 'components/Page/Page'
//import CreateBookshelfEntryMutation from '../mutations/CreateBookshelfEntry'
import createBookMutation from '../mutations/CreateBook'
import createBookshelfEntryMutation from '../mutations/CreateBookshelfEntry'
import FormMessageList from 'components/FormMessageList/FormMessageList'
import { withAuth } from 'modules/auth//utils'
import { graphql, createFragmentContainer, createRefetchContainer } from 'react-relay';


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


      handleFieldChange = (e, {value}) => {
        const input = this.state.input
        const inputName = e.target.id
        input[inputName] = e.target.value
        this.setState({ input })
      }

      handleDropdownChange = (e, data) => {
        const input = this.state.input
        const inputName = data.id
        input[inputName] = data.value
        this.setState({input})
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

        if (!errors) {
          console.log(input)
          createBookMutation(this.props.relay.environment, this.setErrors.bind(this), input, this.onCompletedCreateBook)
        }
        else {
          console.log("errors")
          console.log(errors)
          this.setErrors(errors)
        }

      }


      onCompletedCreateBook = (error, data) => {
        // const input = this.state.input
        console.log("onCompletedCreateBook")
        const refetchVariables = fragmentVariables => ({
          title: this.state.input.title,
          author: this.state.input.author
        });
        console.log(refetchVariables)
        this.props.relay.refetch(refetchVariables, null, this.create)

        // const book_id = this.props.viewer.book
        // const user_id = this.props.viewer.user
        // console.log(book_id)
        // console.log(user_id)

        //
        // createBookshelfEntryMutation(this.props.relay.environment, this.setErrors.bind(this), input, book_id, user_id)
      }

      create = () => {
        const input = this.state.input
        const book_id = this.props.viewer.book
        const user_id = this.props.viewer.user

        console.log("Create")
        console.log(book_id)
        console.log(user_id)

        createBookshelfEntryMutation(this.props.relay.environment, this.setErrors.bind(this), input, book_id, user_id)

      }

      getErrors(fieldId) {
        const { errors } = this.state
        if (errors.length > 0) {
          return errors.filter(x => x.key === fieldId)
        }
        else return []
      }


      render(){
        //console.log(this.props.viewer)
        const{ input, erros } = this.state
        const title = 'Add Book to Bookshelf'


        return(
          <Page viewer={this.props.viewer} title={title}>
          <div className={styles.container}>

            <form
              onSubmit={this.submitForm.bind(this)}
              className={styles.form}
            >

            <Button.Group basic fluid className={styles.readingStatus}>
              <Button type='button' active>
                <div className={styles.readIcon}></div>
                read
              </Button>
              <Button type='button'>
                <div className={styles.readingIcon}></div>
                reading
              </Button>
              <Button type='button'>
                <div className={styles.toReadIcon}></div>
                to-read
              </Button>
            </Button.Group>

            <Input
                id='title'
                className={styles.nameField}
                onChange={this.handleFieldChange}
                value={input.title}
                type='text'
                size="large"
                fluid
                required
                placeholder='book title' />

              <Input
                id='author'
                className={styles.nameField}
                onChange={this.handleFieldChange}
                value={input.author}
                type='text'
                size="large"
                fluid
                required
                placeholder='author' />

            <Dropdown
                 id='rating'
                 className={styles.dropDown}
                 onChange={this.handleDropdownChange}
                 placeholder='rating'
                 fluid
                 required
                 search selection options={ratingOptions}
            />

            <Dropdown
                 id='state'
                 className={styles.dropDown}
                 onChange={this.handleDropdownChange}
                 placeholder='state'
                 fluid
                 required
                 search selection options={stateOptions}
            />


            <Button
              primary
              fluid
              type="submit"
              size="large"
              className='button_submit-add-books-form'
            >
              Add book
            </Button>


              </form>
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
