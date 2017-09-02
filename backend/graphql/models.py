from graphene_django import DjangoObjectType
from backend.models import User, Book, UserBookJoin
import graphene

class GrapheneUser(DjangoObjectType):
    class Meta:
        model = User

class GrapheneBook(DjangoObjectType):
    class Meta:
        model = Book

class GrapheneUserBookJoin(DjangoObjectType):
    class Meta:
        model = UserBookJoin
