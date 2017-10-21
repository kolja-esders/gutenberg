const {
  commitMutation,
  graphql,
} = require('react-relay')
//import { setToken } from '../modules/jwtUtils';







const mutation = graphql`
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




function CreateBook(environment, setErrors, input: {title: string, author: string, rating: int, state: string}, onCompleted){

  const variables = {

      titleInput: input.title,
      authorInput: input.author,

  };
  console.log("CreateBook")
  console.log(variables)
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onError: err => console.error(err),
      onCompleted: onCompleted

    },
  );
}

export default CreateBook
