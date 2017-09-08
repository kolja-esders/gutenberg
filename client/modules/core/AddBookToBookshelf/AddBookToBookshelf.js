import React from 'react'
import styles from './AddBookToBookshelf.scss'
import Page from 'components/Page/Page'
//import CreateBookshelfEntryMutation from '../mutations/CreateBookshelfEntry'
import CreateBookMutation from '../mutations/CreateBook'
import FormMessageList from 'components/FormMessageList/FormMessageList'
import { authenticatedRoute } from 'modules/auth//utils'

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
        const{ input, erros } = this.state
        const title = 'Add Book to Bookshelf'

        return(
          <Page title={title}>
          <div className={styles.container}>

            <form
              onSubmit={this.submitForm}
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
                 search selection options={ratingOptions}
             />

             <Dropdown
                 id='state'
                 className={styles.dropDown}


                 placeholder='state'
                 fluid

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

}

export default authenticatedRoute(AddBookToBookshelf)
