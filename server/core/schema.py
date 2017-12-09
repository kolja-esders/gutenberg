import graphene
from django.contrib.auth import get_user_model
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType, ObjectType
from core.user_helper.jwt_util import get_token_user_id
from core.user_helper.jwt_schema import TokensInterface
from .models import Book as BookModal, BookshelfEntry as BookshelfEntryModal, Membership as MembershipModal, Group as GroupModal, GroupInvite as GroupInviteModal
from .utils import Utils

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
        filter_fields = []

class GroupInvite(DjangoObjectType):
    class Meta:
        model = GroupInviteModal
        interfaces = (graphene.Node, )
        filter_fields = []

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
        )
        interfaces = (graphene.Node, TokensInterface)
        filter_fields = []

    # TODO(kolja): This is currently needed since M2M is still broken in Graphene 2.0.
    books = DjangoFilterConnectionField(BookshelfEntry)
    groups = DjangoFilterConnectionField(Membership)

    def resolve_books(self, info):
        return self.bookshelfentry_set.all()

    def resolve_groups(self, info):
        return self.membership_set.all()

class CoreQueries:
    book = graphene.Node.Field(Book)
    books = graphene.List(Book)
    all_books = DjangoFilterConnectionField(Book)

    bookshelf_entry = graphene.Node.Field(BookshelfEntry)
    bookshelf_entries = graphene.List(BookshelfEntry)
    all_bookshelf_entries = DjangoFilterConnectionField(BookshelfEntry)

    membership = graphene.Node.Field(Membership)
    memberships = graphene.List(Membership)
    all_memberships = DjangoFilterConnectionField(Membership)

    group_invite = graphene.Field(GroupInvite, id=graphene.ID(), verification_token=graphene.String())
    all_group_invites = DjangoFilterConnectionField(GroupInvite)

    group = graphene.Field(Group, id=graphene.ID(), name_url=graphene.String())
    all_groups = DjangoFilterConnectionField(Group)

    def resolve_group(self, info, **args):
        if 'id' in args:
            return GroupModal.objects.get(pk=args['id'])

        return GroupModal.objects.get(name_url=args['name_url'])

    def resolve_group_invite(self, info, **args):
        if 'id' in args:
            return GroupInviteModal.objects.get(pk=args['id'])

        return GroupInviteModal.objects.get(verification_token=args['verification_token'])

    def resolve_books(self, info, **args):
        books = BookModal.objects.all()
        return books

    def resolve_bookshelf_entries(self, info, **args):
        bookshelf_entries = BookshelfEntryModal.objects.all()
        return bookshelf_entries

    def resolve_memberships(self, info, **args):
        memberships = MembershipModal.objects.all()
        return memberships


class CreateBook(graphene.Mutation):
    class Arguments:
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

class CreateGroupInvite(graphene.Mutation):
    class Arguments:
        group_id = graphene.ID(required=True)
        invitee_email = graphene.String(required=True)
        invitee_first_name = graphene.String()
        invitee_last_name = graphene.String()
        host_id = graphene.ID(required=True)

    group_invite = graphene.Field(GroupInvite)

    def mutate(self, args, ctx, info):
        get_node = graphene.Node.get_node_from_global_id
        group = get_node(info, args['group_id'])
        host = get_user_model().objects.get(pk=args['host_id'])
        # TODO(kolja): Throw if user or group not found
        email = args['invitee_email']
        first_name = args['invitee_first_name']
        last_name = args['invitee_last_name']
        verification_token = Utils.generate_verification_token(group, email)

        group_invite = GroupInviteModal(
            group=group,
            email=email,
            first_name=first_name,
            last_name=last_name,
            verification_token=verification_token,
            created_by=host,
            consumed=False
        )
        group_invite.save()
        return CreateGroupInvite(group_invite=group_invite)

class AcceptGroupInvite(graphene.Mutation):
    class Arguments:
        invite_id = graphene.ID(required=True)
        verification_token = graphene.String(required=True)

    success = graphene.Boolean()
    reason = graphene.String()

    def mutate(self, args, ctx, info):
        get_node = graphene.Node.get_node_from_global_id
        verification_token = args['verification_token']
        invite = get_node(info, args['invite_id'])

        reason = ''
        success = False
        if invite.verification_token != verification_token:
            reason = 'Authorization missing to accept invitation.'
        elif invite.consumed:
            reason = 'Invitation has already been accepted.'
        else:
            invite.consumed = True
            invite.save()
            success = True

        return AcceptGroupInvite(success=success, reason=reason)

class CreateBookshelfEntry(graphene.Mutation):
    class Arguments:
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
    class Arguments:
        user_id = graphene.ID(required=True)
        group_id = graphene.ID(required=True)

    membership = graphene.Field(Membership)

    def mutate(self, args, ctx, info):
        get_node = graphene.Node.get_node_from_global_id
        user = get_node(info, args['user_id'])
        group = get_node(info, args['group_id'])

        membership = MembershipModal(
            user = user,
            group = group
        )
        membership.save()
        return CreateMembership(membership=membership)

class CreateGroup(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        name_url = graphene.String(required=True)

    group = graphene.Field(Group)

    def mutate(self, args, ctx, info):
        name = args['name']
        name_url = args['name_url']
        group = GroupModal(name=name, name_url=name_url)
        group.save()
        return CreateGroup(group=group)

class CoreMutations:
    create_book = CreateBook.Field()
    create_bookshelf_entry = CreateBookshelfEntry.Field()
    create_membership = CreateMembership.Field()
    create_group = CreateGroup.Field()
    create_group_invite = CreateGroupInvite.Field()
    accept_group_invite = AcceptGroupInvite.Field()


class Viewer(ObjectType, CoreQueries):
    id = graphene.GlobalID()
    user = graphene.Field(User, jwt_token=graphene.String())

    class Meta:
        interfaces = (TokensInterface,)
