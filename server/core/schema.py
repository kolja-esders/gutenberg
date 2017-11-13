import graphene
from django.contrib.auth import get_user_model
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType, ObjectType
from core.user_helper.jwt_util import get_token_user_id
from core.user_helper.jwt_schema import TokensInterface
from .models import Book as BookModal, BookshelfEntry as BookshelfEntryModal, Membership as MembershipModal, Group as GroupModal

class Book(DjangoObjectType):
    class Meta:
        model = BookModal
        filter_fields = ['author', 'title']
        interfaces = (graphene.Node, )

class BookshelfEntry(DjangoObjectType):
    class Meta:
        model = BookshelfEntryModal
        filter_fields = ['state', 'rating']
        interfaces = (graphene.Node, )

class Group(DjangoObjectType):
    class Meta:
        model = GroupModal
        interfaces = (graphene.Node, )

class Membership(DjangoObjectType):
    class Meta:
        model = MembershipModal
        filter_fields = ['group', 'user']
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
            # 'books',
            # 'groups'
        )
        interfaces = (graphene.Node, TokensInterface)

    bookshelf = graphene.List(BookshelfEntry)
    memberships = graphene.List(Membership)
    all_memberships = DjangoFilterConnectionField(Membership)

    @graphene.resolve_only_args
    def resolve_bookshelf(self):
        return self.bookshelfentry_set.all()

    @graphene.resolve_only_args
    def resolve_memberships(self):
        return self.membership_set.all()

class CoreQueries(graphene.AbstractType):
    book = graphene.Node.Field(Book)
    books = graphene.List(Book)
    all_books = DjangoFilterConnectionField(Book)

    bookshelf_entry = graphene.Node.Field(BookshelfEntry)
    bookshelf_entries = graphene.List(BookshelfEntry)
    all_bookshelf_entries = DjangoFilterConnectionField(BookshelfEntry)

    membership = graphene.Node.Field(Membership)
    memberships = graphene.List(Membership)
    all_memberships = DjangoFilterConnectionField(Membership)

    group = graphene.Field(Group, id=graphene.ID(), name_url=graphene.String())
    all_groups = DjangoFilterConnectionField(Group)


    def resolve_group(self, args, context, info):
        if 'id' in args:
            return GroupModal.objects.get(pk=args['id'])

        return GroupModal.objects.get(name_url=args['name_url'])


    def resolve_books(self, args, context, info):
        books = BookModal.objects.all()
        return books

    def resolve_bookshelf_entries(self, args, context, info):
        bookshelf_entries = BookshelfEntryModal.objects.all()
        return bookshelf_entries

    def resolve_memberships(self, args, context, info):
        memberships = MembershipModal.objects.all()
        return memberships


class CreateBook(graphene.Mutation):
    class Input:
        title = graphene.String(required=True)
        author = graphene.String(required=True)

    book = graphene.Field(Book)

    def mutate(self, args, ctx, info):
        title = args['title']
        author = args['author']
        book = BookModal(
                title = title,
                author = author
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

class CreateMembership(graphene.Mutation):
    class Input:
        user_id = graphene.ID(required=True)
        group_id = graphene.ID(required=True)

    membership = graphene.Field(Membership)

    def mutate(self, args, ctx, info):
        get_node = graphene.Node.get_node_from_global_id
        user = get_node(args['user_id'], ctx, info)
        group = get_node(args['group_id'], ctx, info)

        membership = MembershipModal(
            user = user,
            group = group
        )
        membership.save()
        return CreateMembership(membership=membership)

class CreateGroup(graphene.Mutation):
    class Input:
        name = graphene.String(required=True)
        name_url = graphene.String(required=True)

    group = graphene.Field(Group)

    def mutate(self, args, ctx, info):
        name = args['name']
        name_url = args['name_url']
        group = GroupModal(name=name, name_url=name_url)
        group.save()
        return CreateGroup(group=group)

class CoreMutations(graphene.AbstractType):
    create_book = CreateBook.Field()
    create_bookshelf_entry = CreateBookshelfEntry.Field()
    create_membership = CreateMembership.Field()
    create_group = CreateGroup.Field()


class Viewer(ObjectType, CoreQueries):
    id = graphene.GlobalID()
    user = graphene.Field(User, jwt_token=graphene.String())

    class Meta:
        interfaces = (TokensInterface,)
