class Command(BaseCommand):
    """Create admin and fake users"""

    help = 'Import Volunteers from CSV'

    def add_arguments(self, parser):
        """Amount of users to create"""
        parser.add_argument('count', type=int, default=25)

    def handle(self, **options):
        count = options['count']
        users = get_user_model().objects.all()
        if settings.DEBUG:
            create_test_admin(users)
            generate_fake_users(count)
