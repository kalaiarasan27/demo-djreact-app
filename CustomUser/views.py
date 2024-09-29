from django.contrib.auth import login,authenticate
from .models import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render
import logging
import os
import time
from django.views.generic import TemplateView
from django.conf import settings
from django.contrib.auth import login as django_login
from django.contrib.auth.hashers import make_password
from .utils import check_email_validity
from django.core.mail import send_mail
from django.contrib.auth import views as auth_views
import requests
import random
from twilio.rest import Client
from dotenv import load_dotenv
from decouple import config

# Load the .env file
load_dotenv()


class IndexView(TemplateView):
    def get_template_names(self):
        # Construct the full path to the index.html file
        template_path = os.path.join(settings.BASE_DIR, 'dist', 'index.html')
        
        # Log the path for debugging
        logging.debug(f"Serving template: {template_path}")
        
        # Return the template path
        return [template_path]


# Application Status

@csrf_exempt
def approve_dealer(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        status = data.get('status')
        dealer_id = data.get('dealer_id')
        requirement = data.get('inputValue')

        print(status)
        print(dealer_id)
        print(requirement)

        table = Dealer_Details.objects.get(Dealer_ID = dealer_id)

        table.application_status = status
        table.requirements = requirement
        table.save()

        return JsonResponse({"message ":"Updated successfully"},status = 200)


def fetch_approve_dealer(request):
    try:
        user = request.user.id
        id = DealerProfile.objects.get(user_id=user)
        dealer_id = id.Dealer_ID
        print(dealer_id)

        print("User:", request.user)
        print("Authenticated:", request.user.is_authenticated)



        data  = list(Dealer_Details.objects.filter(Dealer_ID=dealer_id).values())
    except Exception as e:
        print(e)

    return JsonResponse(data,safe=False,status = 200)

def send_extraData(request):
    user = request.user.id
    dealer_data = DealerProfile.objects.get(user_id=user)
    dealer_id = dealer_data.Dealer_ID
        # Access the file(s) from request.FILES
    file1 = request.FILES.getlist('file0')  # Adjust the index if you have multiple files
    file2 = request.FILES.getlist('file1')  # Adjust the index if you have multiple files
    file3 = request.FILES.getlist('file2')  # Adjust the index if you have multiple files
    file4 = request.FILES.getlist('file3')  # Adjust the index if you have multiple files

        # Access the message or boolean from request.POST
    message = request.POST.get('message')
    print('This is Backend Value - ',message)
    print('This is Backend  file1- ',file1)
    print('This is Backend file2 - ',file2)
    print('This is Backend file3 - ',file3)
    print('This is Backend file4 - ',file4)

    table = Dealer_Details.objects.get(Dealer_ID=dealer_id)
    table.dealer_message = message
    # Dynamically assign files or set None if list is empty
    table.extradata_field1 = file1[0] if file1 else None
    table.extradata_field2 = file2[0] if file2 else None
    table.extradata_field3 = file3[0] if file3 else None
    table.extradata_field4 = file4[0] if file4 else None

    table.save()

    print('This is Backend  file1 in DB- ',file1)
    print('This is Backend file2 in DB- ',file2)
    print('This is Backend file3 in DB- ',file3)
    print('This is Backend file4 in DB- ',file4)

    return JsonResponse({'message':'Upload successfuly'},status=200)


@csrf_exempt# OTP Block
def otp_send(request):

        if request.method == 'POST':
            # Prompt user to enter the OTP
            register_data = request.session['data']

            username = register_data.get('name')
            email = register_data.get('email')
            Phone_Number = register_data.get('contact')
            password = make_password(register_data.get('password'))
            role = register_data.get('role')

            print("This is From OTP block  -", email)
            print("This is From OTP block  data-", register_data)





            

            if role == User.USER:
                address = register_data.get('address')
                city = register_data.get('city')
                state = register_data.get('state')
                pincode = register_data.get('pincode')
                Natioanality = register_data.get('country')


                address = f"{address},{city},{state},{pincode}"

                data = json.loads(request.body)
                entered_otp = data.get('enteredOtp')

                otp = request.session.get('otp')
        
                print("Generated OTP -",otp)
                print("Generated String  OTP -",str(otp))
                print("Entered String  OTP -",entered_otp)
                if str(otp) == entered_otp:
                    print("OTP verification successful!")

                            # Create user
                    user = User(username=username, email=email, password=password,phone_number=Phone_Number, role=role)
                    user.save()

                    user_creation  =  UserProfile.objects.create(
                            user=user,
                            User_Name = username,
                            Email = email,
                            Address = address,
                            Phone_Number = Phone_Number,
                            Nationality = Natioanality

                        )
                    if user_creation:
                        register_message = "Welcome to RECYCHBS! We’re excited to have you join our community. Your registration has been successfully completed, and you are now ready to start scheduling scrap pickups from your home or business.Explore our app to see how easy it is to dispose of your scrap responsibly while contributing to a greener environment. You can book a dealer, track your orders, and much more, all from the comfort of your device.Thank you for choosing RECYCHBS"
                        send_mail(
                            "Welcome to RECYCHBS- Successful Registration!",
                            register_message,
                            settings.EMAIL_HOST_USER,
                            [email],
                            fail_silently=False
                        )
                    return JsonResponse({'message': 'User registered successfully'}, status=201)

                else:
                    print("Incorrect OTP. Please try again.")
                    return JsonResponse({"otp_error":"Incorrect OTP. Please try again."},status=400)
                    

            elif role == User.DEALER:
                address = register_data.get('address')
                city = register_data.get('city')
                state = register_data.get('state')
                pincode = register_data.get('pincode')
                Natioanality = register_data.get('country')

                address = f"{address},{city},{state},{pincode}"
                
                # Compare the entered OTP with the generated OTP
                data = json.loads(request.body)
                entered_otp = data.get('enteredOtp')

                otp = request.session.get('otp')
                # resend_otp = request.session['resend_otp']
        
                print("Generated OTP -",otp)
                print("Generated String  OTP -",str(otp))
                print("Entered String  OTP -",entered_otp)

                if str(otp)  == entered_otp:
                    print("OTP verification successful!")
                    # Create user
                    user = User(username=username, email=email, password=password,phone_number=Phone_Number,  role=role)
                    user.save()

                    dealer = DealerProfile.objects.create(
                        user=user,
                        Dealer_Name = username,
                        Phone_Number = Phone_Number,
                        Email = email,
                        Natioanality = Natioanality,
                        Address = address
                    )
                    if dealer:
                        registration_message = "We are thrilled to welcome you to RECYCHBS! Your registration has been successfully completed, and you are now part of our trusted network of scrap dealers.With RECYCHBS, you’ll be able to receive scrap collection orders from users in your area, making it easier to grow your business while contributing to environmental sustainability.We are excited to have you on board and look forward to working with you to create a cleaner, greener community."
                        send_mail(
                            "Welcome to RECYCHBS-Successful Registration!",
                            registration_message,
                            settings.EMAIL_HOST_USER,
                            [email],
                            fail_silently=False
                        )
                    return JsonResponse({'message': 'User registered successfully'}, status=201)

                else:
                    print("Incorrect OTP. Please try again.")
                    return JsonResponse({"otp_error":"Incorrect OTP. Please try again."},status=400)
            elif role == User.ADMIN:
                AdminProfile.objects.create(
                    user=user,
                    role_description=data.get('role_description')
                )

            return JsonResponse({'message': 'User registered successfully'}, status=201)
    # except Exception as e:
        # print("Exeption is :", e)
        return JsonResponse({"error":"Invalid Method!"},status=405)
 

@csrf_exempt
def resend_otp_view(request):
    try:
        if request.method == 'POST':
            register_data = request.session['data']
            Phone_Number = "+91"+register_data.get('contact')
            print("Resend OTP To Phone Number-",Phone_Number)
            # Generate new OTP
           # OTP Block

            # Generate a random 6-digit OTP
                                    # Twilio credentials
            account_sid = config('TWILIO_ACOOUNT_SID')
            auth_token =  config('TWILIO_ACOOUNT_AUTH_TOKEN')
            client = Client(account_sid, auth_token)
            
            # File to store the OTP send count
            otp_count_file = 'otp_count.txt'
            
            # Initialize global variables
            max_otp_send_limit = 5  # Maximum number of OTP sends
            
            # Function to generate a random OTP
            def generate_otp():
                return random.randint(100000, 999999)
            

            
            # Function to read the current OTP send count from a file
            def read_otp_count():
                if os.path.exists(otp_count_file):
                    with open(otp_count_file, 'r') as f:
                        count = f.read()
                        return int(count) if count.isdigit() else 0
                return 0
            
            # Function to write the OTP send count to a file
            def write_otp_count(count):
                with open(otp_count_file, 'w') as f:
                    f.write(str(count))
            
            # Function to send OTP via SMS
            def send_otp(to_phone_number):
                current_count = read_otp_count()
                if current_count >= max_otp_send_limit:
                    print("Error: OTP has already been sent the maximum number of times.")
                    return None  # Stop sending if limit is reached
            
                otp = generate_otp()
                request.session['otp'] = otp

                message = client.messages.create(
                    from_='+19132701336',  # Twilio phone number
                    body=f'Your OTP is: {otp}',
                    to=to_phone_number
                )
                print(f'Sent message: {message.sid}')
            
                # Increment the OTP send count and write to file
                write_otp_count(current_count + 1)
                return otp
            
            # Function to validate OTP
            def validate_otp(sent_otp, start_time):
                current_time = time.time()
                # Check if the OTP is still valid (30 seconds)
                if current_time - start_time > 60:
                    print("OTP is invalid: Time expired")
                    return False
            
            # Main function
            def main():
                to_phone_number = Phone_Number  # User's phone number
                sent_otp = send_otp(to_phone_number)  # Send the OTP
                if sent_otp is None:  # If OTP send failed (limit reached), exit
                    return
            
                start_time = time.time()  # Record the time when OTP is sent
            
                # Simulate user input for OTP
                # user_otp = int(input("Enter the OTP you received: "))
            
                # Validate the OTP
                validate_otp(sent_otp, start_time)
            
            if __name__ == "__main__":
                main()

            return JsonResponse({'message': 'OTP resent successfully!'})

    except Exception as e:
        print(e)
 
    return JsonResponse({'message': 'Invalid request method.'}, status=405)

@csrf_exempt# OTP Block
def register_view(request):
    try:
        if request.method =='POST':
            data = json.loads(request.body)
            print(data)
            request.session['data'] = data
            email = data.get('email')
            print(email)
            Phone_Number = data.get('contact')
            role = data.get('role')
 
            # is_valid = verify_email_hunter(email)
            # result = check_email_validity(email)
            # is_valid = result.get('debounce', {}).get('result') == 'Safe to Send'
            # # return JsonResponse({'is_valid': is_valid, 'result': result})
            # valid_email = ""
            # print("email is verified-",result)
            # print("email is is_valid-",is_valid)
            # print("Before Email valid value",valid_email)
            # print("debounce result ",result.get('debounce', {}).get('result'))

            # if 'Invalid' in result:

            # elif 'error' in result:
            #     # Handle error, e.g., return the error message
            #     return JsonResponse({'error': result['error']}, status=500)
            # if result.get('result') == 'Safe to Send':
            #     valid_email = "Email is Valid"
            #         # Create user profile based on role
            #     # print("In IF",valid_email)
            #     print("debounce result ",result.get('debounce', {}).get('result'))
 
            if role == User.USER:
                address = data.get('address')
                city = data.get('city')
                state = data.get('state')
                pincode = data.get('pincode')
                Natioanality = data.get('country')

                request.session['validated'] = False

                address = f"{address},{city},{state},{pincode}"
                print(address)
                if UserProfile.objects.filter(Email=email).exists():
                    return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
                elif UserProfile.objects.filter(Phone_Number=Phone_Number).exists():
                    return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
                elif User.objects.filter(email=email).exists():
                    return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
                elif User.objects.filter(phone_number=Phone_Number).exists():
                    return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
                else:
                    request.session['validated'] = True

            elif role == User.DEALER:
                data = json.loads(request.body)
                address = data.get('address')
                city = data.get('city')
                state = data.get('state')
                pincode = data.get('pincode')
                Natioanality = data.get('country')
                request.session['validated'] = False

                address = f"{address},{city},{state},{pincode}"
                if DealerProfile.objects.filter(Email=email).exists():
                    return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
                elif DealerProfile.objects.filter(Phone_Number=Phone_Number).exists():
                    return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
                elif User.objects.filter(email=email).exists():
                    return JsonResponse({"error":"SomeOne Already Login with this Email"},status=400)
                elif User.objects.filter(phone_number=Phone_Number).exists():
                    return JsonResponse({"error":"SomeOne Already Login with this Number"},status=400)
                else:
                    request.session['validated'] = True

            elif role == User.ADMIN:
                AdminProfile.objects.create(
                    user='user',
                    role_description=data.get('role_description')
                )
        # else:
            #     valid_email = "Invalid Email.please enter a valid Email"
            #     print("In else-",valid_email)
            #     return JsonResponse({'email_error':valid_email},status=400)
 
 
                                        # OTP Block
            otp_phoneNumber = "+91"+Phone_Number
            print("To phone Number-",otp_phoneNumber)
            
            # Generate a random 6-digit OTP
            # otp = random.randint(100000, 999999)
            # print(f"Generated OTP: {otp}")  # This is just for testing, remove it in production
            # request.session['otp'] = otp
 
            # account_sid = config('TWILIO_ACOOUNT_SID')
            # auth_token =  config('TWILIO_ACOOUNT_AUTH_TOKEN')
            # client = Client(account_sid, auth_token)
            # message = client.messages.create(
            # from_='+1 913 270 1336',  # Note the underscore after from
            # body = f"Your OTP code is {otp}. Please use this to verify your account.", # OTP message content
            # to= otp_phoneNumber
            # )

            # print(message)

            # return JsonResponse({'message': 'OTP sent successfully!'})

                                                # Twilio credentials
            account_sid = config('TWILIO_ACOOUNT_SID')
            auth_token =  config('TWILIO_ACOOUNT_AUTH_TOKEN')
            client = Client(account_sid, auth_token)
            
            # File to store the OTP send count
            otp_count_file = 'otp_count.txt'
            
            # Initialize global variables
            max_otp_send_limit = 5  # Maximum number of OTP sends
            
            # Function to generate a random OTP
            def generate_otp():
                return random.randint(100000, 999999)
            

            
            # Function to read the current OTP send count from a file
            def read_otp_count():
                if os.path.exists(otp_count_file):
                    with open(otp_count_file, 'r') as f:
                        count = f.read()
                        return int(count) if count.isdigit() else 0
                return 0
            
            # Function to write the OTP send count to a file
            def write_otp_count(count):
                with open(otp_count_file, 'w') as f:
                    f.write(str(count))
            
            # Function to send OTP via SMS
            def send_otp(to_phone_number):
                current_count = read_otp_count()
                if current_count >= max_otp_send_limit:
                    print("Error: OTP has already been sent the maximum number of times.")
                    # return None  # Stop sending if limit is reached
                    return JsonResponse({"Error: OTP has already been sent the maximum number of times."},status=400)
            
                otp = generate_otp()
                request.session['otp'] = otp

                message = client.messages.create(
                    from_='+19132701336',  # Twilio phone number
                    body=f'Your OTP is: {otp}',
                    to=to_phone_number
                )
                print(f'Sent message: {message.sid}')
            
                # Increment the OTP send count and write to file
                write_otp_count(current_count + 1)
                return otp
            
            # Function to validate OTP
            def validate_otp(sent_otp, start_time):
                current_time = time.time()
                # Check if the OTP is still valid (30 seconds)
                if current_time - start_time > 60:
                    print("OTP is invalid: Time expired")
                    # return False
                    return JsonResponse({"OTP is invalid: Time expired"},status=400)

            
            # Main function
            def main():
                to_phone_number = otp_phoneNumber  # User's phone number
                sent_otp = send_otp(to_phone_number)  # Send the OTP
                if sent_otp is None:  # If OTP send failed (limit reached), exit
                    return
            
                start_time = time.time()  # Record the time when OTP is sent
            
                # Simulate user input for OTP
                # user_otp = int(input("Enter the OTP you received: "))
            
                # Validate the OTP
                validate_otp(sent_otp, start_time)
            
            if __name__ == "__main__":
                main()

            return JsonResponse({'message': 'OTP resent successfully!'})

    except Exception as e:
        print("Exeption is ",e)
    return JsonResponse({'error': 'Invalid method'}, status=405)
@csrf_exempt
def login_view(request):
    try:
                data = json.loads(request.body)
 
                user_data = data.get('user', {})
                dealer_data = data.get('dealer', {})
                loginType = data.get('loginType', '')


                print("login type is-",loginType)



                print("Request POST is-",request.POST)
                print("Request POST is-",request.body)
                print("Request is-",request)



                # print("user is -",user)
                if loginType == User.DEALER:
                    email = dealer_data.get('email', '')
                    password = dealer_data.get('password', '')
                    user = authenticate(request, email=email, password=password)
                    if user is not None:
                        if User.objects.filter(email=email, role=User.DEALER).exists():
                            django_login(request, user)
                            user = request.user.id  # Assuming the user is logged in
                            dealer = DealerProfile.objects.get(user_id=user)
                            dealer_id = dealer.Dealer_ID
                            if Dealer_Details.objects.filter(Dealer_ID=dealer_id).exists():
                                details_sent = "True"
                                print("form already sent")
                            else:
                                details_sent = "False"
                                print("form doesn't  sent yet")
                            return JsonResponse({'message': 'Login successfull',"form_submitted":details_sent}, status=200)
                        else:
                            return JsonResponse({'error': 'Incorrect Username Or Password'}, status=401)
                elif loginType == User.USER:
                    email = user_data.get('email', '')
                    password = user_data.get('password', '')
                    user = authenticate(request, email=email, password=password)
                    if user is not None:

                        if User.objects.filter(email=email, role=User.USER).exists():
                            django_login(request, user)
                            return JsonResponse({'message': 'Login successfull'}, status=200)

                        else:
                            return JsonResponse({'error': 'Incorrect Username Or Password'}, status=401)

                else:
                    return JsonResponse({'error': 'Incorrect  UserName Or Password'}, status=401)
    except Exception as e:
        print(e)


    # return JsonResponse({'error': 'Invalid method'}, status=405) 
    return JsonResponse({'error': 'Use the Correct Credentials To Login'},status=401) 

# Forget Password


class CustomPasswordResetView(auth_views.PasswordResetCompleteView):
    template_name = 'password_reset/password_reset_form.html'  # Your custom template
class CustomPasswordResetCompleteView(auth_views.PasswordResetCompleteView):
    template_name = 'password_reset/password_reset_done.html'  # Your custom template
class CustomPasswordResetCompleteView(auth_views.PasswordResetCompleteView):
    template_name = 'registration/password_reset_confirm.html'  # Your custom template
class CustomPasswordResetCompleteView(auth_views.PasswordResetCompleteView):
    template_name = 'registration/password_reset_complete.html'  # Your custom template



# @csrf_exempt  # Only if you're handling CSRF in another way
def dealer_details(request):
    # Text Fields
    user = request.user.id
    id = DealerProfile.objects.get(user_id=user)
    dealer_id = id.Dealer_ID
    name = request.POST.get('name')
    phone_number = request.POST.get('phoneNumber')
    mail_id = request.POST.get('mailId')
    DOB = request.POST.get('dateOfBirth')
    aadharNumber = request.POST.get('aadharNumber')
    panCardNumber = request.POST.get('panCardNumber')
    licenseNumber = request.POST.get('licenseNumber')
    vehicleNumber = request.POST.get('vehicleNumber')
    address = request.POST.get('address')
    # street = request.POST.get('street')
    city = request.POST.get('city')
    state = request.POST.get('state')
    postcode = request.POST.get('postcode')
    country = request.POST.get('country')
    Nationality = request.POST.get('nationality')
    bankAccountNumber = request.POST.get('bankAccountNumber')
    ifscCode = request.POST.get('ifscCode')
    bankAccountName = request.POST.get('bankAccountName')
    VehicleType = request.POST.get('vehicleType')
    aadhar = request.FILES.get('aadhar')
    pan_card = request.FILES.get('panCard')
    license_file = request.FILES.get('license')
    vehicle_file = request.FILES.get('vehicle')
    dealer = Dealer_Details(
       Dealer_ID = dealer_id, Dealer_Name = name,mail_id = mail_id,DOB = DOB,Phone_Number = phone_number,Address = address,Aadhar_No = aadharNumber,Aadhar_Photo = aadhar,PAN_No = panCardNumber,PAN_Photo = pan_card,LICENSE_No = licenseNumber,LICENSE_Photo = license_file,Vehicle_No = vehicleNumber,Vehicle_Photo = vehicle_file,City = city,State = state,Post_Code = postcode,Country = country,Nationality = Nationality,Bank_AccountName = bankAccountName,Bank_Acc = bankAccountNumber,IFSC_CODE = ifscCode,Vehicle_Type = VehicleType
    )
    dealer.save()

    print("Dealer Deatails Sent")

    return JsonResponse({"message":"Form Sended","status":"S"},status=200)



@csrf_exempt
def InsertScrap(request):
    
    Scrap_Name = request.POST.get('name')
    Scrap_Price = request.POST.get('panCardNumber')
    Scrap_Image = request.FILES.get('aadhar')

    print(Scrap_Image,Scrap_Name,Scrap_Price)

    data = Scrap_Type.objects.create(Scrap_Name = Scrap_Name,Current_Price_Per_KG=Scrap_Price,Scrap_Image=Scrap_Image)

    data.save()


    return JsonResponse({"message":"Scarp inserted Successfully"},status=200)


@csrf_exempt
def UpdateScrap(request):
    
    Scrap_Name = request.POST.get('name')
    Scrap_Price = request.POST.get('panCardNumber')
    Scrap_Image = request.FILES.get('aadhar')

    data = Scrap_Type.objects.get(Scrap_ID = 1)

    data.Scrap_Name = Scrap_Name
    data.Current_Price_Per_KG = Scrap_Price
    data.Scrap_Image = Scrap_Image

    data.save()
     
    return JsonResponse({"message":"Updated Successfully"},status=200)




@csrf_exempt
def GetScrap(request):
    data  = list(Scrap_Type.objects.filter().values())
    
    for scrap in data:
    #         # scrap['Scrap_Image'] = request.build_absolute_uri(scrap['Scrap_Image']).replace('/fetch/', '/')
        scrap['Scrap_Image'] = Scrap_Type.objects.get(Scrap_ID=scrap['Scrap_ID']).Scrap_Image.url
        print(scrap['Scrap_Image'] )

    
    return JsonResponse(data ,safe = False,status = 200)


# Admin Site--------

@csrf_exempt
def Get_DealerDetails(request):
    # Fetch the data from the Dealer_Details model
    data = list(Dealer_Details.objects.filter().values())
    
    # Loop through each dealer and add the URL for each image field
    for dealer in data:
        dealer_details = Dealer_Details.objects.get(Dealer_ID=dealer['Dealer_ID'])
        
        # Add the full URLs for the image fields
        dealer['Aadhar_Photo'] = dealer_details.Aadhar_Photo.url if dealer_details.Aadhar_Photo else None
        dealer['PAN_Photo'] = dealer_details.PAN_Photo.url if dealer_details.PAN_Photo else None
        dealer['LICENSE_Photo'] = dealer_details.LICENSE_Photo.url if dealer_details.LICENSE_Photo else None
        dealer['Vehicle_Photo'] = dealer_details.Vehicle_Photo.url if dealer_details.Vehicle_Photo else None
        dealer['extradata_field1'] = dealer_details.extradata_field1.url if dealer_details.extradata_field1 else None
        dealer['extradata_field2'] = dealer_details.extradata_field2.url if dealer_details.extradata_field2 else None
        dealer['extradata_field3'] = dealer_details.extradata_field3.url if dealer_details.extradata_field3 else None
        dealer['extradata_field4'] = dealer_details.extradata_field4.url if dealer_details.extradata_field4 else None
    
    # Return the data as JSON
    return JsonResponse(data, safe=False, status=200)


@csrf_exempt
def Get_UserProfile(request):
    print("Function Called")
    data=list(UserProfile.objects.filter().values())
    for user in data:
        user_profile=UserProfile.objects.all()
    print("Data is -",data)
    print("The user data is -",user_profile)

    print("The Data is ",data)
    print("The Data is ")
    return JsonResponse(data, safe=False, status=200)

# @csrf_exempt
# def Get_ExtraData(request):
#     data = list(Dealer_Details.objects.filter().values())

#     return JsonResponse(data,safe=False,status=200)
