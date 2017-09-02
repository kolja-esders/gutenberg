import graphene
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from users.jwt_util import get_token_user_id
from .models import Book as BookModal, UserBookJoin as UserBookJoinModal


class Book(DjangoObjectType):
    class Meta:
        model = BookModal
        interfaces = (graphene.Node, )

class UserBookJoin(DjangoObjectType):
    class Meta:
        model = UserBookJoinModal
        interfaces = (graphene.Node, )


class CoreQueries(graphene.AbstractType):
    books = graphene.Node.Field(Book)
    #books = DjangoFilterConnectionField(Book)
    # users = graphene.List(GrapheneUser)
    # books = graphene.List(GrapheneBook)
    # user_book_joins = graphene.List(GrapheneUserBookJoin)

    user_book_joins = graphene.Node.Field(UserBookJoin)
    #user_book_joins = DjangoFilterConnectionField(UserBookJoin)

    def resolve_books(self, args, context, info):
        books = BookModal.objects
        return books

    def resolve_user_book_joins(self, args, context, info):
        user_book_joins = UserbookJoinModal.objects
        return user_book_joins

class BookInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    author = graphene.String(required=True)


class CreateBook(graphene.Mutation):
    class Input:
        book_data = BookInput(required=True)

    book = graphene.Field(Book)

    def mutate(self, args, ctx, info):
        book_data = args['book_data']
        book = BookModal(
                name = book_data['name'],
                author = book_data['author']
            )
        book.save()
        return CreateBook(book=book)


class ConnectUserToBook(graphene.Mutation):
    class Input:
        user_id = graphene.String(required=True)
        book_id = graphene.String(required=True)
        state = graphene.String(required=True)
        rating = graphene.Int(required=True)

    user_book_join = graphene.Field(UserBookJoin)

    def mutate(self, args, ctx, info):
        user_id = args['user_id']
        book_id = args['book_id']
        state = args['state']
        rating = args['rating']
        user = User.objects.get(pk=user_id)
        book = Book.objects.get(pk=book_id)
        user_book_join = UserBookJoinModal(
                user = user,
                book= book,
                state = state,
                rating = rating
            )
        user_book_join.save()
        return ConnectUserToBook(user_book_join=user_book_join)


class CoreMutations(graphene.AbstractType):
    create_book = CreateBook.Field()
    create_user_to_book = ConnectUserToBook.Field()
