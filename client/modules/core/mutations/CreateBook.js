const {
  commitMutation,
  graphql,
} = require('react-relay')
//import { setToken } from '../modules/jwtUtils';







const mutation_create_book = graphql`
  mutation CreateBookMutation(
    $titleInput: String!, $authorInput: String!
  ){
      createBook(title: $titleInput, author: $authorInput){
        book
        {
          title
          author
        }
}
}
`;




function CreateBook(environment, setErrors, input:{title: string, author: string}){

  const variables = {

      titleInput: input.title,
      authorInput: input.author,

  };
  console.log("CreateBook")
  console.log(variables)
  commitMutation(
    environment,
    {
      mutation_create_book,
      variables,
      onError: err => console.error(err)
    }
  )
}

export default CreateBook
