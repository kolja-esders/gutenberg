//import Polls from 'modules/polls/Polls';
//import PollsDetail from 'modules/polls/PollsDetail';
//import PollsResults from 'modules/polls/PollsResults';
import SharedBooks from 'modules/core/SharedBooks/SharedBooks';
import AddBookToBookshelf from 'modules/core/AddBookToBookshelf/AddBookToBookshelf';

const coreRoutes = [
  {
    path: '/shared-books',
    component: SharedBooks,
  },
  {
    path: '/add-book',
    component: AddBookToBookshelf,
  },
  //{
    //path: '/polls/:id/detail',
    //component: PollsDetail,
  //},
  //{
    //path: '/polls/:id/results',
    //component: PollsResults,
  //},
  //{
    //path: '/polls/:id/vote',
    //component: PollsVote,
  //}
];

export default coreRoutes;
