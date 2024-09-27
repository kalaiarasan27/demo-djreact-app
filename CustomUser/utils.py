# utils.py
import requests
import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()
DEBOUNCE_API_KEY = os.getenv('DEBOUNCE_API_KEY') #'66f02e8eeb216'

def check_email_validity(email):
    debounce_url = 'https://api.debounce.io/v1/'
    params = {
        'api': DEBOUNCE_API_KEY,
        'email': email
    }
    
    try:
        response = requests.get(debounce_url, params=params)
        if response.status_code == 200:
            result = response.json()
            # Result has a 'debounce' key with a status like 'Safe', 'Invalid', etc.
            return result['debounce']
        else:
            return {'error': 'Failed to validate email'}
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}
