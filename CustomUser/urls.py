from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register-form/', register_view, name='register_form'),
    path('login-form/', login_view, name='login_form'),
    path('otp/', otp_send, name='otp_send'),
    path('resend-otp/', resend_otp_view, name='resend-otp'),
    path('dealer_details/', dealer_details, name='dealer_details'),


    path('fetch/', GetScrap, name='GetScrap'),
    path('InsertScrap/', InsertScrap, name='InsertScrap'),
    path('UpdateScrap/', UpdateScrap, name='UpdateScrap'),
    path('StatusActive/', approve_dealer, name='approve_dealer'),
    path('FetchStatusActive/', fetch_approve_dealer, name='fetch_approve_dealer'),
    path('send_extraData/', send_extraData, name='send_extraData'),




# Forget Password

    path('password_reset/',auth_views.PasswordResetView.as_view(),name='password_reset'),
 
    path('password_reset/done/',auth_views.PasswordResetDoneView.as_view(),name='password_reset_done'),
 
    path('reset/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(),name='password_reset_confirm'),
 
    path('reset/done/', CustomPasswordResetCompleteView.as_view(), name='password_reset_complete'),

    # Admin URLS

    path('fetchDealerDetails/', Get_DealerDetails, name='Get_DealerDetails'),
    path('fetchUserProfile/', Get_UserProfile, name='Get_UserProfile'),
]
