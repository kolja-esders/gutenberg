import React from 'react'
import styles from './AddBookToBookshelf.scss'
import Page from 'components/Page/Page'
//import CreateBookshelfEntryMutation from '../mutations/CreateBookshelfEntry'
import CreateBookMutation from '../mutations/CreateBook'
import FormMessageList from 'components/FormMessageList/FormMessageList'
import { withAuth } from 'modules/auth//utils'
import { graphql, createFragmentContainer } from 'react-relay';

import { Header, Segment, Input, Dropdown, Button, Rating } from 'semantic-ui-react';


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
/*
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
*/
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
        console.log("in submitForm")
        const { input, errors } = validateInput(this.state.input)
        const { environment, router } = this.props
        if (!errors) {
          console.log(input)
          console.log("submitForm -> no errors")
          CreateBookMutation(environment, this.setErrors.bind(this), input)

          //TODO: add userID and bookID
          //CreateBookshelfEntryMutation(environment, this.setErrors.bind(this), input)
        }
        else {
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
        const { input, erros } = this.state
        const title = 'Add book'

        return(
          <Page viewer={this.props.viewer} title={title}>
            <div className={styles.container}>
              <Segment padded='very'>
                <Header as='h1'>New book</Header>

            <form
              onSubmit={this.submitForm}
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
                onChange={this.handleFieldChange.bind(this)}
                value={input.title}
                type='text'
                size='huge'
                fluid
                required
                placeholder='book title' />

              <Input
                id='author'
                className={styles.nameField}
                onChange={this.handleFieldChange.bind(this)}
                value={input.author}
                type='text'
                size='huge'
                fluid
                required
                placeholder='author' />

            <Dropdown
                 id='rating'
                 className={styles.dropDown}
                 placeholder='rating'
                 size='huge'
                 fluid
                 search selection options={ratingOptions}
             />

           <Button
             color='green'
              fluid
              type='submit'
              size='huge'
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

export default createFragmentContainer(
  withAuth(AddBookToBookshelf),
  graphql`
    fragment AddBookToBookshelf_viewer on Viewer {
      ...Page_viewer
    }
  `,
)
