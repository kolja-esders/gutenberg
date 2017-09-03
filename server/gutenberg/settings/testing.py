from .dev import *

SELENIUM_DRIVER = 'Remote'

SELENIUM_CAPABILITY = {
    'platform': 'ANY',
    'browserName': 'chrome',
    'version': '',
    'javascriptEnabled': True}

SELENIUM_HOST = env('SELENIUM_HOST')
