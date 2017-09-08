/**
 * @flow
 * @relayHash 6fc07f369ef1d0a8b1b3bab6a3a26dea
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type rootViewerQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query rootViewerQuery {
  viewer {
    ...Page_viewer
    ...Landing_viewer
    ...SharedBooks_viewer
    id
  }
}

fragment Page_viewer on Viewer {
  ...Header_viewer
}

fragment Landing_viewer on Viewer {
  ...Page_viewer
  id
  user {
    email
    username
    books {
      ...MyBookList_book_entries
      id
    }
    id
  }
}

fragment SharedBooks_viewer on Viewer {
  ...Page_viewer
  id
  user {
    email
    username
    books {
      ...SharedBooksList_book_entries
      id
    }
    id
  }
}

fragment SharedBooksList_book_entries on BookshelfEntry {
  id
  book {
    title
    author
    id
  }
  rating
}

fragment MyBookList_book_entries on BookshelfEntry {
  id
  book {
    title
    author
    id
  }
  rating
}

fragment Header_viewer on Viewer {
  id
  user {
    email
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "rootViewerQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Page_viewer",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "Landing_viewer",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "SharedBooks_viewer",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "rootViewerQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "rootViewerQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "email",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "username",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "BookshelfEntry",
                "name": "books",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "BookshelfEntry",
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Book",
                        "name": "book",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "title",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "author",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "id",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "rating",
                        "storageKey": null
                      }
                    ]
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query rootViewerQuery {\n  viewer {\n    ...Page_viewer\n    ...Landing_viewer\n    ...SharedBooks_viewer\n    id\n  }\n}\n\nfragment Page_viewer on Viewer {\n  ...Header_viewer\n}\n\nfragment Landing_viewer on Viewer {\n  ...Page_viewer\n  id\n  user {\n    email\n    username\n    books {\n      ...MyBookList_book_entries\n      id\n    }\n    id\n  }\n}\n\nfragment SharedBooks_viewer on Viewer {\n  ...Page_viewer\n  id\n  user {\n    email\n    username\n    books {\n      ...SharedBooksList_book_entries\n      id\n    }\n    id\n  }\n}\n\nfragment SharedBooksList_book_entries on BookshelfEntry {\n  id\n  book {\n    title\n    author\n    id\n  }\n  rating\n}\n\nfragment MyBookList_book_entries on BookshelfEntry {\n  id\n  book {\n    title\n    author\n    id\n  }\n  rating\n}\n\nfragment Header_viewer on Viewer {\n  id\n  user {\n    email\n    id\n  }\n}\n"
};

module.exports = batch;
