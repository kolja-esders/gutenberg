import graphene
from .models import GrapheneUser, GrapheneBook, GrapheneUserBookJoin
from backend.models import User, Book, UserBookJoin

class UserInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    email = graphene.String(required=True)
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)
    password = graphene.String(required=True)

class BookInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    author = graphene.String(required=True)

class CreateUser(graphene.Mutation):
    class Input:
        user_data = UserInput(required=True)

    user = graphene.Field(GrapheneUser)

    def mutate(self, args, ctx, info):
        user_data = args['user_data']
        user = User(
                username = user_data['username'],
                email = user_data['email'],
                first_name = user_data['first_name'],
                last_name = user_data['last_name'],
                password = user_data['password']
            )
        user.save()
        return CreateUser(user=user)

class CreateBook(graphene.Mutation):
    class Input:
        book_data = BookInput(required=True)

    book = graphene.Field(GrapheneBook)

    def mutate(self, args, ctx, info):
        book_data = args['book_data']
        book = Book(
                name = book_data['name'],
                author = book_data['author']
            )
        book.save()
        return CreateBook(book=book)

class AddBook(graphene.Mutation):
    class Input:
        user_data = UserInput(required=True)
        book_data = UserInput(required=True)

    user = graphene.Field(GrapheneUser)

    def mutate(self, args, ctx, info):
        user_data = args['user_data']
        user = User(
                username = user_data['username'],
                email = user_data['email'],
                first_name = user_data['first_name'],
                last_name = user_data['last_name'],
                password = user_data['password']
            )

        user.save()
        return CreateUser(user=user)

class ConnectUserToBook(graphene.Mutation):
    class Input:
        user_id = graphene.String(required=True)
        book_id = graphene.String(required=True)
        state = graphene.String(required=True)
        rating = graphene.Int(required=True)

    user_book_join = graphene.Field(GrapheneUserBookJoin)

    def mutate(self, args, ctx, info):
        user_id = args['user_id']
        book_id = args['book_id']
        state = args['state']
        rating = args['rating']
        user = User.objects.get(pk=user_id)
        book = Book.objects.get(pk=book_id)
        user_book_join = UserBookJoin(
                user = user,
                book= book,
                state = state,
                rating = rating
            )
        user_book_join.save()
        return ConnectUserToBook(user_book_join=user_book_join)
