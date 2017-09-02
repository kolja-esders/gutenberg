import graphene
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from users.jwt_util import get_token_user_id
# from .models import Question as QuestionModal, Choice as ChoiceModal, \
    # Vote as VodeModal


class CoreQueries(graphene.AbstractType):
    # question = graphene.Node.Field(Question)
    # questions = DjangoFilterConnectionField(Question)

    def resolve_questions(self, args, context, info):
        pass
        # issues = QuestionModal.objects
        # order_by = args.get('order_by')
        # if order_by:
            # issues.order_by(order_by)

        # return issues

class CoreMutations(graphene.AbstractType):
    pass
    # vote = VoteMutation.Field()
