const {
  commitMutation,
  graphql,
} = require('react-relay')
//import { setToken } from '../modules/jwtUtils';



const mutation = graphql`
    mutation CreateBookshelfEntryMutation(
      $userIdInput: ID!, $bookIdInput: ID!, $stateInput: String!, $ratingInput: Int!
    ) {
      createBookshelfEntry(userId: $userIdInput, bookId: $bookIdInput, state: $stateInput, rating: $ratingInput) {
          bookshelfEntry{
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



function CreateBookshelfEntry(environment, setErrors, input:{title: string, author: string, rating: int, state: string}, book_id, user_id){
console.log("CreateBookshelfEntry")
const variables = {
  userIdInput: user_id,
  bookIdInput: book_id,
  ratingInput: input.rating,
  stateInput: input.state,
}
console.log(variables)
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onError: err => console.error(err),
      onCompleted: (response, err) => {
        console.log(response, err)
      }
    }
  )

}

export default CreateBookshelfEntry
