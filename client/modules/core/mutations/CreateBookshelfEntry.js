const {
  commitMutation,
  graphql,
} = require('react-relay')
//import { setToken } from '../modules/jwtUtils';




const mutation = graphql`
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



function CreateBookshelfEntry(environment, setErrors, input{title: string,, author: string, rating: int, state: string})
  commitMutation(
    environment,
    {
      mutation,
      variables:{
        input
      }

    }
  )
}

export default CreateBookshelfEntry
