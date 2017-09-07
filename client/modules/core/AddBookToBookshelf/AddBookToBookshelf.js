import React from 'react'
import styles from './AddBookToBookshelf.scss'
import Page from 'components/Page/Page'
import FormMessageList from 'components/FormMessageList/FormMessageList'
import { authenticatedRoute } from 'modules/auth//utils'

import { Input, Dropdown } from 'semantic-ui-react';


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
                value={input.author}
                type='text'
                size="large"
                fluid
                required
                placeholder='author' />

            <br />


              <Input
                id='rating'
                className={styles.nameField}
                value={input.rating}
                type='text'
                size="large"
                fluid
                required
                placeholder='rating' />

            <br />

            <Dropdown
                id='rating'
                className={styles.dropDown}
                value={input.state}
                placeholder='rating'
                fluid
                required
                search selection options={ratingOptions}
            />


            <Dropdown
                id='state'
                className={styles.dropDown}
                value={input.state}
                placeholder='state'
                fluid
                required
                search selection options={stateOptions}
            />






              </form>
            </div>
          </Page>
        )

    }

}








export default authenticatedRoute(AddBookToBookshelf)
