const {
  commitMutation,
  graphql,
} = require('react-relay')
//import { setToken } from '../modules/jwtUtils';

/*

const mutation = graphql`
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
const variables = {
  userIdInput,
  bookIdInput,
  ratingInput = input.rating,
  stateInput = input.state,
}
  commitMutation(
    environment,
    {
      mutation,
      variables
      onError: err => console.error(err)
    }
  )

}
*/
export default CreateBookshelfEntry
