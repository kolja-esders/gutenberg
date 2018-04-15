import factory
from django.contrib.auth import get_user_model
from ..models import Book, EditionUserJoin



def create_test_admin(users):
    """Create admin user if none exist"""
    if not users:
        get_user_model().objects.create_superuser(
                email="admin@test.com",
                password="test_password",
                first_name="John",
                last_name="Doe",
        )


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = get_user_model()

    email = factory.Faker('email')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')

class BookFactory(factory.DjangoModelFactory):
    class Meta:
        model = Book

    title = factory.Faker('word')
    author = factory.Faker('last_name')

class EditionUserJoinFactory(factory.DjangoModelFactory):
    class Meta:
        model = EditionUserJoin

    user = get_user_model().objects.first()
    book = Book.objects.first()
    state = factory.Faker('word')
    rating = 1


def generate_fake_users(number_of_users=25):
    """Generate 25 fake users"""
    for _ in range(0, number_of_users):
        UserFactory()



def generate_fake_books(number_of_books=25):
    """Generate 25 fake books"""
    for _ in range(0, number_of_books):
        BookFactory()


def generate_fake_edition_user_joins(number_of_edition_user_joins=25):
    """Generate 25 fake edition_user_joins"""
    for _ in range(0, number_of_edition_user_joins):
        EditionUserJoinFactory()
