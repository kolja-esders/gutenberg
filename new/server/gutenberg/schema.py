import graphene

from core.schema import CoreQueries
from core.schema import CoreMutations
from users.schema import UserQueries, UserMutations


class Query(
    UserQueries,
    CoreQueries,
    graphene.ObjectType
):
    pass

class Mutation(
    UserMutations,
    CoreMutations,
    graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
