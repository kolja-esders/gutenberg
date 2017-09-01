from django.conf.urls import url
from graphene_django.views import GraphQLView
from django.contrib import admin

urlpatterns = [
    url(r'^graphql', GraphQLView.as_view(graphiql=True)),
    url(r'^admin/', admin.site.urls),
]
