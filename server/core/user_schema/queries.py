import graphene
from django.contrib.auth import get_user_model
from graphene import AbstractType, Field, String

from core.user_helper.jwt_util import get_token_user_id
from core.schema import User, Viewer


class UserQueries(AbstractType):
    viewer = Field(Viewer)

    users = graphene.List(User)
    user = graphene.Node.Field(User)

    @staticmethod
    def resolve_users(self, args, context, info):
        return get_user_model().objects.select_related('books').all()

    @staticmethod
    def resolve_viewer(self, args, context, info):

        try:
            token_user_id = get_token_user_id(args, context)
            user = get_user_model().objects.get(id=token_user_id)
            print(user)
            return Viewer(
                id=0,
                user=user
            )
        except BaseException:
            return Viewer(
                id=0,
                user=get_user_model()(
                    id=0,
                    email=""
                )
            )
