const {
  commitMutation,
  graphql,
} = require('react-relay')
//import { setToken } from '../modules/jwtUtils';



/*
const mutation_create_bookshelf_entry = graphql`
    mutation createBookshelfEntry(
      $uId: String!, $bId: String!, $st: String!, $rt: Int!
    ) {
        createUserToBook(userId: $uId, bookId: $bId, state: $st, rating: $rt) {
          userBookJoin {
            book {
              id
            }
            user {
              id
            }
            state
            rating
    }
  }
}
`

const mutation_create_book = graphql`
  mutation createBook(
    $titleInput: String!, $authorInput: String!
  ){
      createBook(title: $titleInput, author:$authorInput){
        book
        {
          title
          author
        }
}
}
`



function CreateBookshelfEntry(environment, setErrors, input{title: string, author: string, rating: int, state: string}){
  commitMutation(
    environment,
    {
      mutation_create_book,
      variables:{
        titleInput: title
        authorInput: author
    }

    }
  )
/*
  commitMutation(
    environment,
    {
      mutation_create_bookshelf_entry,
      variables:{

      }

    }
  )

}
*/
export default CreateBookshelfEntry
