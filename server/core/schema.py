import graphene
from django.contrib.auth import get_user_model
from graphql import GraphQLError
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType, ObjectType
from core.user_helper.jwt_util import get_token_user_id
from core.user_helper.jwt_schema import TokensInterface
<<<<<<< HEAD
from .models import Book as BookModal, EditionUserJoin as EditionUserJoinModal, Membership as MembershipModal, Group as GroupModal, GroupInvite as GroupInviteModal
=======
from .models import Book as BookModal, Author as AuthorModal, Language as LanguageModal, Publisher as PublisherModal,  Membership as MembershipModal, Group as GroupModal, GroupInvite as GroupInviteModal, Genre as GenreModal, Edition as EditionModal, Platform as PlatformModal, EditionPlatformJoin as EditionPlatformJoinModal, EditionUserJoin as EditionUserJoinModal
>>>>>>> 80f26f6105e3ab99a1e7e03af4887208f9da099d
from .utils import Utils
from .email import Email, EmailBuilder

class Book(DjangoObjectType):
    class Meta:
        model = BookModal
        filter_fields = ['author', 'original_edition']
        interfaces = (graphene.Node, )

<<<<<<< HEAD
class EditionUserJoin(DjangoObjectType):
    class Meta:
        model = EditionUserJoinModal
        filter_fields = ['state', 'rating']
=======
class Author(DjangoObjectType):
    class Meta:
        model = AuthorModal
        filter_fields = ['name']
        interfaces = (graphene.Node, )

class Language(DjangoObjectType):
    class Meta:
        model = LanguageModal
        filter_fields = ['name', 'english_name', 'alpha3']
        interfaces = (graphene.Node, )

class Publisher(DjangoObjectType):
    class Meta:
        model = PublisherModal
        filter_fields = ['name']
        interfaces = (graphene.Node, )

class Genre(DjangoObjectType):
    class Meta:
        model = GenreModal
        filter_fields = ['name']
        interfaces = (graphene.Node, )

class Edition(DjangoObjectType):
    class Meta:
        model = EditionModal
        filter_fields = ['book', 'title', 'num_edition', 'num_pages', 'language', 'isbn10', 'isbn13', 'publisher', 'date_published']
        interfaces = (graphene.Node, )

class EditionUserJoin(DjangoObjectType):
    class Meta:
        model = EditionUserJoinModal
        filter_fields = ['state', 'rating', 'book', 'edition', 'user']
        interfaces = (graphene.Node, )

class Platform(DjangoObjectType):
    class Meta:
        model = PlatformModal
        filter_fields = ['name']
        interfaces = (graphene.Node, )

class EditionPlatformJoin(DjangoObjectType):
    class Meta:
        model = EditionPlatformJoinModal
        filter_fields = ['rating', 'uid', 'edition', 'platform']
>>>>>>> 80f26f6105e3ab99a1e7e03af4887208f9da099d
        interfaces = (graphene.Node, )

class Group(DjangoObjectType):
    class Meta:
        model = GroupModal
        interfaces = (graphene.Node, )
        filter_fields = []

class GroupInvite(DjangoObjectType):
    class Meta:
        model = GroupInviteModal
        filter_fields = ['group', 'email', 'consumed']
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
            'profile_image',
            'sent_invites',
            'received_invites'
        )
        interfaces = (graphene.Node, TokensInterface)
        filter_fields = []

    # TODO(kolja): This is currently needed since M2M is still broken in Graphene 2.0.
    books = DjangoFilterConnectionField(EditionUserJoin)
    groups = DjangoFilterConnectionField(Membership)

    def resolve_books(self, info):
        return self.editionuserjoin_set.all()

    def resolve_groups(self, info):
        return self.membership_set.all()

class CoreQueries:
    book = graphene.Field(Book, id=graphene.ID(), title=graphene.String(), author=graphene.String())
    books = graphene.List(Book)
    all_books = DjangoFilterConnectionField(Book)

    edition_user_join = graphene.Node.Field(EditionUserJoin)
    edition_user_joins = graphene.List(EditionUserJoin)
    all_edition_user_joins = DjangoFilterConnectionField(EditionUserJoin)
<<<<<<< HEAD
=======

    edition_platform_join = graphene.Node.Field(EditionPlatformJoin)
    all_edition_platform_joins = DjangoFilterConnectionField(EditionPlatformJoin)

    author = graphene.Node.Field(Author)
    all_authors = DjangoFilterConnectionField(Author)

    platform = graphene.Node.Field(Platform)
    all_platform = DjangoFilterConnectionField(Platform)

    edition = graphene.Node.Field(Edition)
    all_edition = DjangoFilterConnectionField(Edition)

    publisher = graphene.Node.Field(Publisher)
    all_publishers = DjangoFilterConnectionField(Publisher)

    genre = graphene.Node.Field(Genre)
    all_genres = DjangoFilterConnectionField(Genre)

    language = graphene.Node.Field(Language)
    all_languages = DjangoFilterConnectionField(Language)
>>>>>>> 80f26f6105e3ab99a1e7e03af4887208f9da099d

    membership = graphene.Node.Field(Membership)
    memberships = graphene.List(Membership)
    all_memberships = DjangoFilterConnectionField(Membership)

    group_invite = graphene.Field(GroupInvite, id=graphene.ID(), verification_token=graphene.String())
    all_group_invites = DjangoFilterConnectionField(GroupInvite)

    group = graphene.Field(Group, id=graphene.ID(), name_url=graphene.String())
    all_groups = DjangoFilterConnectionField(Group)

    def resolve_book(self, info, **args):
        if 'id' in args:
            return BookModal.objects.get(pk=args['id'])

        book = BookModal.objects.get(title=args['title'], author=args['author'])
        return book

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

    def resolve_books_autocompleted(self, info, **args):
         return BookModal.objects.filter(title__icontains=args['title'])

    def resolve_edition_user_joins(self, info, **args):
        edition_user_joins = EditionUserJoinModal.objects.all()
        return edition_user_joins

    def resolve_memberships(self, info, **args):
        memberships = MembershipModal.objects.all()
        return memberships


class CreateEdition(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        author = graphene.String(required=True)

    book = graphene.Field(Book)

    def mutate(self, info, **args):
        title = args['title']
        author = args['author']
        book = BookModal(
                title = title,
                author = author
            )
        book.save()
        return CreateEdition(book=book)

class CreateGroupInvite(graphene.Mutation):
    class Arguments:
        group_id = graphene.ID(required=True)
        invitee_email = graphene.String(required=True)
        invitee_first_name = graphene.String()
        invitee_last_name = graphene.String()
        host_id = graphene.ID(required=True)

    group_invite = graphene.Field(GroupInvite)

    def mutate(self, info, **args):
        get_node = graphene.Node.get_node_from_global_id
        group = get_node(info, args['group_id'])
        host = get_node(info, args['host_id'])
        # TODO(kolja): Throw if user or group not found
        email = args['invitee_email']
        first_name = args['invitee_first_name']
        last_name = args['invitee_last_name']
        verification_token = Utils.generate_verification_token(group, email)
        if get_user_model().objects.filter(email=email).exists():
            invitee = get_user_model().objects.get(email=email)
        else:
            invitee = None

        group_invite = None
        try:
            group_invite = GroupInviteModal(
                group=group,
                email=email,
                first_name=first_name,
                last_name=last_name,
                verification_token=verification_token,
                created_by=host,
                consumed=False,
                email_sent=False,
                invitee=invitee
            )
            group_invite.save()
        except Exception:
            raise GraphQLError('Invite was already sent to this email.')

        host_fields = {'first_name': host.first_name, 'last_name': host.last_name}
        invitee_fields = {'first_name': first_name, 'last_name': last_name}
        invite_fields = {'group_name': group.name, 'verification_token': verification_token}

        if invitee:
            content = EmailBuilder.build_existing_user_invitation_email(invite_fields, host_fields, invitee_fields)
        else:
            content = EmailBuilder.build_new_user_invitation_email(invite_fields, host_fields, invitee_fields)

        try:
            Email().recipient('kolja.esders@gmail.com').sender(email).subject(content['subject']).text(content['text']).send()
        except Exception:
            raise GraphQLError('Unable to send email.')

        group_invite.email_sent = True
        group_invite.save()

        return CreateGroupInvite(group_invite=group_invite)

class AcceptGroupInvite(graphene.Mutation):
    class Arguments:
        invite_id = graphene.ID(required=True)
        verification_token = graphene.String(required=True)

    success = graphene.Boolean()
    reason = graphene.String()

    def mutate(self, info, **args):
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

class CreateEditionUserJoin(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        book_id = graphene.ID(required=True)
        state = graphene.String(required=True)
        rating = graphene.Int(required=True)

    edition_user_join = graphene.Field(EditionUserJoin)

    def mutate(self, info, **args):
        get_node = graphene.Node.get_node_from_global_id
        state = args['state']
        rating = args['rating']
        user = get_node(info, args['user_id'])
        book = get_node(info, args['book_id'])
        edition_user_join = EditionUserJoinModal(
                user = user,
                book = book,
                state = state,
                rating = rating
            )
        edition_user_join.save()
        return CreateEditionUserJoin(edition_user_join=edition_user_join)


class UpdateRating(graphene.Mutation):
    class Arguments:
        edition_user_join_id = graphene.ID(required=True)
        rating = graphene.Int(required=True)

    edition_user_join = graphene.Field(EditionUserJoin)

    def mutate(self, info, **args):
        get_node = graphene.Node.get_node_from_global_id
        edition_user_join = get_node(info, args['edition_user_join_id'])
        rating = args['rating']
        edition_user_join.rating = rating
        edition_user_join.save()
        return UpdateRating(edition_user_join = edition_user_join)

class UpdateState(graphene.Mutation):
    class Arguments:
        edition_user_join_id = graphene.ID(required=True)
        state = graphene.String(required=True)

    edition_user_join = graphene.Field(EditionUserJoin)

    def mutate(self, info, **args):
        get_node = graphene.Node.get_node_from_global_id
        edition_user_join = get_node(info, args['edition_user_join_id'])
        state = args['state']
        edition_user_join.state = state
        edition_user_join.save()
        return UpdateState(edition_user_join = edition_user_join)

class UpdateUser(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)

    user = graphene.Field(User)

    def mutate(self, info, **args):
        get_node = graphene.Node.get_node_from_global_id
        user = get_node(info, args['user_id'])
        first_name = args['first_name']
        last_name = args['last_name']
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        return UpdateUser(user=user)

class CreateMembership(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        group_id = graphene.ID(required=True)
        invite_id = graphene.ID()

    membership = graphene.Field(Membership)

    def mutate(self, info, **args):
        get_node = graphene.Node.get_node_from_global_id
        user = get_node(info, args['user_id'])
        group = get_node(info, args['group_id'])
        invite = get_node(info, args['invite_id']) if 'invite_id' in args else None

        membership = MembershipModal(
            user=user,
            group=group,
            invite=invite
        )
        membership.save()
        return CreateMembership(membership=membership)

class CreateGroup(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        name_url = graphene.String(required=True)

    group = graphene.Field(Group)

    def mutate(self, info, **args):
        name = args['name']
        name_url = args['name_url']
        group = GroupModal(name=name, name_url=name_url)
        group.save()
        return CreateGroup(group=group)

class CoreMutations:
    create_edition = CreateEdition.Field()
    create_edition_user_join = CreateEditionUserJoin.Field()
    create_membership = CreateMembership.Field()
    create_group = CreateGroup.Field()
    create_group_invite = CreateGroupInvite.Field()
    accept_group_invite = AcceptGroupInvite.Field()
    update_user = UpdateUser.Field()
    update_rating = UpdateRating.Field()
    update_state = UpdateState.Field()


class Viewer(ObjectType, CoreQueries):
    id = graphene.GlobalID()
    user = graphene.Field(User, jwt_token=graphene.String())

    class Meta:
        interfaces = (TokensInterface,)
