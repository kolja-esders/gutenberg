const {
  commitMutation,
  graphql,
} = require('react-relay')
//import { setToken } from '../modules/jwtUtils';


/*
const mutation_create_bookshelf_entry = graphql`
    mutation createBookshelfEntryMutation(
      $userIdInput: String!, $bookIdInput: String!, $stateInput: String!, $ratingInput: Int!
    ) {
        createUserToBook(userId: $userIdInput, bookId: $bookIdInput, state: $stateInput, rating: $ratingInput) {
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
`;



function CreateBookshelfEntry(environment, setErrors, input:{title: string, author: string, rating: int, state: string}){
  commitMutation(
    environment,
    {
      mutation_create_bookshelf_entry,
      variables:{
        //TODO
        userIdInput:
        bookIdInput:
      }

    }
  )

}
*/
export default CreateBookshelfEntry
