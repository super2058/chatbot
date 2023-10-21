from twilio.twiml.voice_response import Gather, VoiceResponse, Say
from twilio.rest import Client
import openai
from flask import request

# Set your Twilio credentials
TWILIO_ACCOUNT_SID = 'AC9a04f1a490ed0d7eb7fb8b304303d333'
TWILIO_AUTH_TOKEN = 'd9360dbacfd70a1cf895aa543c09a685'
TWILIO_PHONE_NUMBER = '+18669417751'

# Set your OpenAI API key
OPENAI_API_KEY = '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'

# Initialize Twilio client
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Initialize OpenAI client
openai.api_key = OPENAI_API_KEY

def generate_ai_response(input_text):
    response = openai.Completion.create(
        engine="text-davinci-003",  # Use an appropriate OpenAI engine
        prompt=input_text,
        max_tokens=50  # Adjust as needed
    )
    return response.choices[0].text.strip()

def handle_voice_interaction():
    response = VoiceResponse()

    # Use Gather to capture user input
    with response.gather(numDigits=1, action='/process-input', method='POST') as gather:
        gather.say("Welcome! Please speak or press any key to start.")

    return str(response)

def process_input():
    user_input = request.values.get('SpeechResult')
    if user_input:
        ai_response = generate_ai_response(user_input)
        response = VoiceResponse()
        response.say(ai_response)
        response.say("Thank you for using our service. Goodbye!")
    else:
        response = VoiceResponse()
        response.say("Sorry, we didn't receive any input. Goodbye!")

    return str(response)


