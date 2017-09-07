import graphene
from django.contrib.auth import get_user_model
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType, ObjectType
from core.user_helper.jwt_util import get_token_user_id
from core.user_helper.jwt_schema import TokensInterface
from .models import Book as BookModal, UserBookJoin as UserBookJoinModal, Membership as MembershipModal, Group as GroupModal

class Book(DjangoObjectType):
    class Meta:
        model = BookModal
        filter_fields = ['author', 'name']
        interfaces = (graphene.Node, )

class UserBookJoin(DjangoObjectType):
    class Meta:
        model = UserBookJoinModal
        filter_fields = ['state', 'rating']
        interfaces = (graphene.Node, )

class Group(DjangoObjectType):
    class Meta:
        model = GroupModal
        interfaces = (graphene.Node, )

class Membership(DjangoObjectType):
    class Meta:
        model = MembershipModal
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

    books = graphene.List(UserBookJoin)

    @graphene.resolve_only_args
    def resolve_books(self):
        return self.userbookjoin_set.all()

class CoreQueries(graphene.AbstractType):
    book = graphene.Node.Field(Book)
    books = graphene.List(Book)
    all_books = DjangoFilterConnectionField(Book)

    user_book_join = graphene.Node.Field(UserBookJoin)
    user_book_joins = graphene.List(UserBookJoin)
    all_user_book_joins = DjangoFilterConnectionField(UserBookJoin)

    membership = graphene.Node.Field(Membership)
    memberships = graphene.List(Membership)
    all_memberships = DjangoFilterConnectionField(Membership)

    group = graphene.Node.Field(Group)
    all_groups = DjangoFilterConnectionField(Group)


    def resolve_books(self, args, context, info):
        books = BookModal.objects.all()
        return books

    def resolve_user_book_joins(self, args, context, info):
        user_book_joins = UserBookJoinModal.objects.all()
        return user_book_joins

    def resolve_memberships(self, args, context, info):
        memberships = MembershipModal.objects.all()
        return memberships

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
        user = get_user_model().objects.get(pk=user_id)
        book = BookModal.objects.get(pk=book_id)
        user_book_join = UserBookJoinModal(
                user = user,
                book= book,
                state = state,
                rating = rating
            )
        user_book_join.save()
        return ConnectUserToBook(user_book_join=user_book_join)

class CreateMembership(graphene.Mutation):
    class Input:
        user_id = graphene.String(required=True)
        group_id = graphene.String(required=True)

    membership = graphene.Field(Membership)

    def mutate(self, args, ctx, info):
        user = get_user_model().objects.get(pk=args['user_id'])
        group = GroupModal.objects.get(pk=args['group_id'])
        membership = MembershipModal(
            user = user,
            group = group
        )
        membership.save()
        return CreateMembership(membership=membership)

class CreateGroup(graphene.Mutation):
    class Input:
        name = graphene.String(required=True)

    group = graphene.Field(Group)

    def mutate(self, args, ctx, info):
        name = args['name']
        name_url = GroupModal.get_url_from_name(name)
        group = GroupModal(name=name, name_url=name_url)
        group.save()
        return CreateGroup(group=group)

class CoreMutations(graphene.AbstractType):
    create_book = CreateBook.Field()
    create_user_to_book = ConnectUserToBook.Field()
    create_membership = CreateMembership.Field()
    create_group = CreateGroup.Field()


class Viewer(ObjectType, CoreQueries):
    id = graphene.GlobalID()
    user = graphene.Field(User, jwt_token=graphene.String())

    class Meta:
        interfaces = (TokensInterface,)
