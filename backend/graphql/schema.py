import graphene
from graphene_django import DjangoObjectType
from .mutations import CreateUser, CreateBook, ConnectUserToBook
from .models import GrapheneUser, GrapheneBook, GrapheneUserBookJoin
from backend.models import User, Book

class Query(graphene.ObjectType):
    users = graphene.List(GrapheneUser)
    books = graphene.List(GrapheneBook)
    user_book_joins = graphene.List(GrapheneUserBookJoin)

    @graphene.resolve_only_args
    def resolve_users(self):
        return User.objects.all()

    @graphene.resolve_only_args
    def resolve_books(self):
        return Book.objects.all()

    @graphene.resolve_only_args
    def resolve_user_book_joins(self):
        return UserBookJoin.objects.all()

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    create_book = CreateBook.Field()
    connect_user_to_book = ConnectUserToBook.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
