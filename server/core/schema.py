import graphene
from django.contrib.auth import get_user_model
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType, ObjectType
from core.user_helper.jwt_util import get_token_user_id
from core.user_helper.jwt_schema import TokensInterface
from .models import Book as BookModal, BookshelfEntry as BookshelfEntryModal

class Book(DjangoObjectType):
    class Meta:
        model = BookModal
        filter_fields = ['author', 'name']
        interfaces = (graphene.Node, )

class BookshelfEntry(DjangoObjectType):
    class Meta:
        model = BookshelfEntryModal
        filter_fields = ['state', 'rating']
        interfaces = (graphene.Node, )

class User(DjangoObjectType):
    class Meta:
        model = get_user_model()
        only_fields = (
            'id',
            'last_login',
            'is_superuser',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'is_active',
            'date_joined',
            'books'
        )
        interfaces = (graphene.Node, TokensInterface)

    books = graphene.List(BookshelfEntry)

    @graphene.resolve_only_args
    def resolve_books(self):
        return self.bookshelfentry_set.all()

class CoreQueries(graphene.AbstractType):
    book = graphene.Node.Field(Book)
    books = graphene.List(Book)
    all_books = DjangoFilterConnectionField(Book)

    bookshelf_entry = graphene.Node.Field(BookshelfEntry)
    bookshelf_entries = graphene.List(BookshelfEntry)
    all_bookshelf_entries = DjangoFilterConnectionField(BookshelfEntry)

    def resolve_books(self, args, context, info):
        books = BookModal.objects.all()
        return books

    def resolve_bookshelf_entries(self, args, context, info):
        bookshelf_entries = BookshelfEntryModal.objects.all()
        return bookshelf_entries

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


class CreateBookshelfEntry(graphene.Mutation):
    class Input:
        user_id = graphene.String(required=True)
        book_id = graphene.String(required=True)
        state = graphene.String(required=True)
        rating = graphene.Int(required=True)

    bookshelf_entry = graphene.Field(BookshelfEntry)

    def mutate(self, args, ctx, info):
        user_id = args['user_id']
        book_id = args['book_id']
        state = args['state']
        rating = args['rating']
        user = get_user_model().objects.get(pk=user_id)
        book = BookModal.objects.get(pk=book_id)
        bookshelf_entry = BookshelfEntryModal(
                user = user,
                book= book,
                state = state,
                rating = rating
            )
        bookshelf_entry.save()
        return CreateBookshelfEntry(bookshelf_entry=bookshelf_entry)


class CoreMutations(graphene.AbstractType):
    create_book = CreateBook.Field()
    create_bookshelf_entry = CreateBookshelfEntry.Field()


class Viewer(ObjectType, CoreQueries):
    id = graphene.GlobalID()
    user = graphene.Field(User, jwt_token=graphene.String())

    class Meta:
        interfaces = (TokensInterface,)
