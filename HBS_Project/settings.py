"""
Django settings for HBS_Project project.

Generated by 'django-admin startproject' using Django 5.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
import os
import dj_database_url
import django_heroku
from django.conf import settings
from decouple import config
from dotenv import load_dotenv

# Load the .env file
load_dotenv()


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-f247#btkri*v8$@^pbnr7mf@&#llh59-*$x7b5p^-$d4&gwsjp'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['django-djreact-app-d5af3d4e3559.herokuapp.com']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',  # WhiteNoise for static files during development
    'django.contrib.staticfiles',
    'CustomUser',
    'corsheaders',
    'storages',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',

]

ROOT_URLCONF = 'HBS_Project.urls'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'assets/'

STATIC_ROOT = os.path.join(BASE_DIR,'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'dist','assets'),
]



TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'dist')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'HBS_Project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# DATABASES = {
#     'default': dj_database_url.parse(os.environ.get('mysql://vp74v4k1viap1uyd:t2ubeigrwyu0jqyg@qbhol6k6vexd5qjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/bong599rpr85d37q'), conn_max_age=600)
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'iouglvt01h4ci7xr',
        'HOST':'g3v9lgqa8h5nq05o.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        'USER':'k7hfmgnudk95cuf1',
        'PASSWORD':'plheafgysnujutni',
        'PORT':'3306',

    }
}
# mysql://k7hfmgnudk95cuf1:plheafgysnujutni@g3v9lgqa8h5nq05o.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/iouglvt01h4ci7xr
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'HBS_Database',
#         'HOST':'localhost',
#         'USER':'root',
#         'PASSWORD':'mooshi',
#         'PORT':'3306',
#     }
# }

#Custom User
# AUTHENTICATION_BACKENDS = [
#     'HBS_Project.backends.UsernamePhoneBackend',  # Custom backend for username, phone, and password
#     'django.contrib.auth.backends.ModelBackend',  # Default backend
# ]
AUTH_USER_MODEL = 'CustomUser.User'


# MEDIA_ROOT = '/media/'

# MEDIA_ROOT = os.path.join(BASE_DIR,'media')

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True



# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # React app's URL
    'https://django-djreact-app-d5af3d4e3559.herokuapp.com',  # React app's URL
    'https://adminapp-46edb27550db.herokuapp.com',  # React app's URL
    'https://hsb-admin-ui.onrender.com',
    'https://hsb-ui.onrender.com',
    'https://hbs-admin-afcea2f2324b.herokuapp.com',
    'https://new-hbs-admin-82beda5bc10a.herokuapp.com',
    'https://demo-djreact-recyc-app-ee540343796a.herokuapp.com'

]

CORS_ORGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True  # Allow credentials like cookies to be included

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',  # React app's URL
    'https://django-djreact-app-d5af3d4e3559.herokuapp.com',  # React app's URL
    'https://adminapp-46edb27550db.herokuapp.com',  # React app's URL
    'https://hsb-admin-ui.onrender.com',
    'https://hsb-ui.onrender.com',
    'https://hbs-admin-afcea2f2324b.herokuapp.com',
    'https://new-hbs-admin-82beda5bc10a.herokuapp.com',
    'https://demo-djreact-recyc-app-ee540343796a.herokuapp.com'


]


SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # Default: use database for session storage

# Important for allowing cross-origin cookies to be shared:
SESSION_COOKIE_SAMESITE = None  # Allow the session cookie to be shared across different origins
SESSION_COOKIE_SECURE = False  # Set to True in production when using HTTPS


django_heroku.settings(locals())

AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
AWS_S3_REGION_NAME = config('AWS_S3_REGION_NAME')  # e.g. 'us-west-2'

AWS_DEFAULT_ACL = None  # Or 'public-read' if needed
AWS_S3_FILE_OVERWRITE = True
AWS_S3_VERITY = True



# Static files (CSS, JavaScript, etc.)
# STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
# STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/static/'

# Media files
DEFAULT_FILE_STORAGE = 'CustomUser.storages.MediaStorage'  # Replace with the path to your storages.py
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'



# HUNTER API

# settings.py

# HUNTER_API_KEY = '99e1bacd61126ab59f2fe00c71d2f99bf060c730'

# SEND EMAIL

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

# For development (to see the email in the terminal)
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'



# Twilio Block

TWILIO_ACOOUNT_SID = config('TWILIO_ACOOUNT_SID')
TWILIO_ACOOUNT_AUTH_TOKEN = config('TWILIO_ACOOUNT_AUTH_TOKEN')